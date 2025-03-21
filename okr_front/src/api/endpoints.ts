import { jsx } from "react/jsx-runtime"
import { Roles } from "../types/user"
import UrlBuilder from "./urlBuilder";

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
            }).then(response => response.blob()).then(res => {//Что делать с response? Должен же быть CSV?
                return res
            }).catch(error => {throw new Error(error)})
        }
    },
    admin:{
        getUsers:(jwt:string) =>{
            return fetch(UrlBuilder.tools.getUsers(), {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {return response.json()}).then(res => {
                return res
            }).catch(error => {throw new Error(error)})
        }
    },
    tools:{
        addTeacher: (jwt:string, id:string) => {
            return fetch(UrlBuilder.tools.addTeacher(id), {
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {
                if (response.ok){
                    return true;
                }
            })
        },
        addSubGroup: (jwt:string, subgroupName:string, groupName:string) => {
            return fetch(UrlBuilder.tools.addSubgroup(subgroupName, groupName), {
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({groupName, subgroupName})
            }).then(response => {
                if (response.ok){
                    return true;
                }
            })
        }
    }
}

export default endpoint