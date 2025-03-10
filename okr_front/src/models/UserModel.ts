import UserInfo from "../types/user"

import endpoint from "../api/endpoints"

enum UserStorageItems{
    token = "token",
    email = "email",
    name = "name",
    surname = "surname",
    patronymic = "patronymic",
    roles = "roles"
}

class UserModel implements UserInfo{
    Jwt?: string | null | undefined
    Name?: string | null | undefined
    Surname?: string | null | undefined
    Patronymic?: string | null | undefined
    Email?: string | null | undefined
    Roles : string[] = []

    private separator: string = "; "

    constructor(){
        this.getInst()
    }

    login(email: string, password: string): void {
        endpoint.user.login({email: email, password: password}).then(res => {
            this.Jwt = res.token
            this.getInfo()
        })
    }
    logout(): void {
        this.clear()
    }

    private getInfo(): void {
        endpoint.user.info(this.Jwt!).then(res => {
            this.Email = res.email
            this.Name = res.name
            this.Surname = res.surname
            this.Patronymic = res.patronymic
            this.Roles = res.role
            this.saveInst()
        })
    }

    private saveInst(): void {
        if (this.Jwt != null){
            localStorage.setItem(UserStorageItems.token, this.Jwt!)
            localStorage.setItem(UserStorageItems.name, this.Name!)
            localStorage.setItem(UserStorageItems.surname, this.Surname!)
            localStorage.setItem(UserStorageItems.patronymic, this.Patronymic!)
            localStorage.setItem(UserStorageItems.email, this.Email!)
            localStorage.setItem(UserStorageItems.roles, this.Roles!.join(this.separator))
        }
        else{
            this.clear()
        }
    }

    private clear() : void {
        this.Jwt = null
        this.Email = null
        this.Name = null
        this.Surname = null
        this.Patronymic = null
        this.Roles = []

        localStorage.removeItem(UserStorageItems.token)
        localStorage.removeItem(UserStorageItems.email)
        localStorage.removeItem(UserStorageItems.name)
        localStorage.removeItem(UserStorageItems.surname)
        localStorage.removeItem(UserStorageItems.patronymic)
        localStorage.removeItem(UserStorageItems.roles)
    }

    private getInst() : void{
        let token = localStorage.getItem(UserStorageItems.token)
        if (token != null){
            console.log(token)
            this.Jwt = token
            this.Email = localStorage.getItem(UserStorageItems.email)
            this.Name =  localStorage.getItem(UserStorageItems.name)
            this.Surname =  localStorage.getItem(UserStorageItems.surname)
            this.Patronymic =  localStorage.getItem(UserStorageItems.patronymic)
            this.Roles =  localStorage.getItem(UserStorageItems.roles)!.split(this.separator)
        }
        else{
            this.clear()
        }
    }
}

export default UserModel