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

        registration: async (data : {username: string, email: string, surname:string, patronymic: string, bithdate: string,  password: string}) => {
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
            return new Promise(resolver => setTimeout(resolver, 100)).then(res => {
                return {
                    name: "Василий",
                    surname: "Полушкин",
                    patronymic: "Игоревич",
                    email: "john@email.com",
                    role: [
                      Roles.student,
                      Roles.teacher,
                      Roles.worker,
                      Roles.admin
                    ]
                  }
            })
        }
    }
}

export default endpoint