import { jsx } from "react/jsx-runtime"
import { Roles } from "../types/user"
import UrlBuilder from "./urlBuilder";
import FiltrationInterface from "../types/filtraton";

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
        }
    },
    worker: {
        getRequests: (jwt: string, filtration: FiltrationInterface) => {
            return fetch(UrlBuilder.requests.getAll(), {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {
                return response.json()
            }).catch(error => {throw new Error(error)})
        }
    }
}

export default endpoint