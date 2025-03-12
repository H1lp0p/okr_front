import { Roles } from "../types/user"

import endpoint from "../api/endpoints"

enum UserStorageItems{
    token = "token",
    email = "email",
    name = "name",
    surname = "surname",
    patronymic = "patronymic",
    roles = "roles"
}

class UserModel{
    Jwt?: string | null | undefined
    Name?: string | null | undefined
    Surname?: string | null | undefined
    Patronymic?: string | null | undefined
    Email?: string | null | undefined
    Roles : Roles[] = []

    private separator: string = "; "

    constructor(){
        this.getInst()
    }

    login(email: string, password: string): Promise<UserModel> {
        return endpoint.user.login({email: email, password: password}).then(res => {
            this.Jwt = res.token
        }).then(res => this.getInfo()).then(res => new UserModel())
    }
    logout(): Promise<UserModel> {
        this.clear()
        return new Promise((resolver) => {
            setTimeout(resolver, 1000)
        }).then((res) => {
            return new UserModel()
        })
    }

    private getInfo(): Promise<boolean> {
        return endpoint.user.info(this.Jwt!).then(res => {
            this.Email = res.email
            this.Name = res.name
            this.Surname = res.surname
            this.Patronymic = res.patronymic
            this.Roles = res.role
            this.saveInst()
        }).then(res => true)
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
            this.Jwt = token
            this.Email = localStorage.getItem(UserStorageItems.email)
            this.Name =  localStorage.getItem(UserStorageItems.name)
            this.Surname =  localStorage.getItem(UserStorageItems.surname)
            this.Patronymic =  localStorage.getItem(UserStorageItems.patronymic)
            this.Roles =  localStorage.getItem(UserStorageItems.roles)!.split(this.separator).map((val: String) => {return Roles[val as keyof typeof Roles]})
        }
        else{
            this.clear()
        }
    }
}

export default UserModel