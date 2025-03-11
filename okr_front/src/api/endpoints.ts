import { Roles } from "../types/user"

const endpoint = {
    user: {
        login: (data : {email: string, password: string}) => {
            return new Promise(resolver => {
                setTimeout(resolver, 1000)
            }).then(res => {
                return {
                    token: "test token"
                }
            })
        },
        info: (jwt: string) => {
            return new Promise(resolver => setTimeout(resolver, 1000)).then(res => {
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