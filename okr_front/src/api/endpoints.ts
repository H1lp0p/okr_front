import { jsx } from "react/jsx-runtime"
import { Roles } from "../types/user"
import UrlBuilder from "./urlBuilder";
import FiltrationInterface from "../types/filtraton";
import RequestInfoModel from "../models/RequstModel";

const readFileBytes = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
      
      reader.onerror = () => reject(new Error('Ошибка чтения файла'));
      
      reader.readAsArrayBuffer(file);
    });
}

const endpoint = {
    user: {
        login: async (data : {email: string, password: string}) => {
            return fetch (UrlBuilder.user.login(),{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                }).then(response => {
                    if (response.ok){
                        return response.json();
                    }else{
                        throw new Error('Login is failed!')
                    }
                }).then(res => {
                    return res
                }).catch((error) => {throw new Error(error)});
        },

        registration: async (data : {name: string, email: string, surname:string, patronymic: string, bithdate: string,  password: string}) => {
            return fetch (UrlBuilder.user.register(),{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                }).then(response => {
                    if (response.ok){
                        return response.json()
                    }else{
                        throw new Error('Registration is failed!')
                    }
                }).then(res => {
                    return res
                }).catch((error) => {throw new Error(error)})
        },
        info: (jwt: string) => {
            return fetch(UrlBuilder.user.getInfo(), {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }).then(response => response.json()).then(res => {
                console.log("info!", res);
                return res
            })
            .catch(error => {throw new Error(error)})
        },
    },
    gant:{
        gant: (jwt:string, data: {surname?:string, group?:string, subgroup?:string, favourite?:boolean, dateStart?:Date, dateEnd?:Date}) => {
            return fetch(UrlBuilder.students.gant(), {
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then(res => {
                return res
            }).catch(error => {throw new Error(error)})
        },
        downloadCSV: (jwt:string, data: {surname?:string, group?:string, subgroup?:string, favourite?:boolean, dateStart?:Date, dateEnd?:Date}) => {
            return fetch(UrlBuilder.requests.export(), {
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then(res => {//Что делать с response? Должен же быть CSV?
                return res
            }).catch(error => {throw new Error(error)})
        }
    },
    worker: {
        getRequests: (jwt: string, filtration: FiltrationInterface, pagination: {page: number, pageSize: number}) => {
            let query = new URLSearchParams({...filtration, pageIndex: pagination.page.toString(), pageSize: pagination.pageSize.toString()})
            return fetch(`${UrlBuilder.requests.getAll()}?${query.toString()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {
                return response.json()
            }).catch(error => {throw new Error(error)})
        }
    },
    request:{
        getMy: (jwt: string, pagination: {page: number, pageSize: number}) => {
            let query = new URLSearchParams({pageIndex: pagination.page.toString(), pageSize: pagination.pageSize.toString()})
            return fetch(`${UrlBuilder.requests.getMy()}?${query.toString()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {
                return response.json()
            }).catch(error => {throw new Error(error)})
        },

        add: async (jwt: string, newRequest: RequestInfoModel) => {

            console.log(newRequest);

            let files = await Promise.all(newRequest.attachments.map((el) => {
                return readFileBytes(el.file!).then(res => {
                    return {
                        file: res.map((el) => el).join(''),
                        fileName: el.fileName
                    }
                })
            }))



            let data = {
                startDate: newRequest.beginDate.toISOString().slice(0, 10),
                endDate: newRequest.endDate.toISOString().slice(0, 10),
                type: newRequest.requestType,
                confirmationFiles: files
            }

            console.log("--------data---------", data);
            

            return fetch(UrlBuilder.requests.create(), {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(respose => {
                if (respose.ok){
                    return true
                }
                else{
                    throw new Error(`${respose.status}`)
                }
            }).catch(err => {throw new Error(err)})
        },
        edit: (jwt: string, newRequest: RequestInfoModel) => {
            let data = {
                startDate: newRequest.beginDate,
                endDate: newRequest.endDate,
                type: newRequest.requestType,
                status: newRequest.requestStatus
            }

            return fetch(UrlBuilder.requests.edit(newRequest.id), {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(respose => {
                if (respose.ok){
                    return true
                }
                else{
                    throw new Error(`${respose.status}`)
                }
            }).catch(err => {throw new Error(err)})
        },
        prolong: (jwt: string, newRequest: RequestInfoModel) => {
            let data = {
                newEndDate: newRequest.endDate
            }

            return fetch(UrlBuilder.requests.prolong(newRequest.id), {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(respose => {
                if (respose.ok){
                    return true
                }
                else{
                    throw new Error(`${respose.status}`)
                }
            }).catch(err => {throw new Error(err)})
        },
        attach: (jwt: string, newRequest: RequestInfoModel) => {

            let data = newRequest.attachments.map((el) => {
                    return {
                        file: el.file,
                        fileName: el.fileName
                    }
                })

            return fetch(UrlBuilder.requests.prolong(newRequest.id), {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(data)
            }).then(respose => {
                if (respose.ok){
                    return true
                }
                else{
                    throw new Error(`${respose.status}`)
                }
            }).catch(err => {throw new Error(err)})
        },
    }
}

export default endpoint