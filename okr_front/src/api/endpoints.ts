import { jsx } from "react/jsx-runtime"
import { Roles } from "../types/user"

const baseUrl = "http://90.188.93.70:39965/";

const endpoint = {
    user: {
        login: async (data : {email: string, password: string}) => {
            try {const response = await fetch (baseUrl + 'account/login',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                });
                const res = await response.json();
                if (response.ok){
                    console.log("Login success!")
                    return res;
                }else{
                    console.log(res.message);
                }
                }catch(error){
                    console.error(error);
                };
        },
        registration: async (data : {username: string, email: string, surname:string, patronymic: string, bithdate: string,  password: string}) => {
            try {const response = await fetch (baseUrl + 'account/register',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
                });
                const res = await response.json();
                if (response.ok){
                    console.log("Registration success!")
                    return res;
                }else{
                    console.log(res.message);
                }
                }catch(error){
                    console.error(error);
                };
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