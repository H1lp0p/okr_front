import { Roles } from "../types/user"

import endpoint from "../api/endpoints"

enum UserStorageItems{
    token = "token",
    email = "email",
    name = "name",
    surname = "surname",
    patronymic = "patronymic",
    roles = "roles",
    group = "group"
}

class UserModel{
    Jwt?: string | null | undefined
    Name?: string | null | undefined
    Surname?: string | null | undefined
    Patronymic?: string | null | undefined
    Email?: string | null | undefined
    Roles : Roles[] = []
    GroupName?: string | null | undefined

    private separator: string = "; "

    constructor(){
        this.getInst()
    }

    login(email: string, password: string): Promise<UserModel> {
        return endpoint.user.login({email: email, password: password}).then(res => {
            this.Jwt = res.token
        }).then(res => this.getInfo()).then(res => new UserModel())
    }
    register(username: string, email: string, surname:string, patronymic: string, bithdate: string,  password: string): Promise<UserModel>{
        return endpoint.user.registration({name: username, email: email , surname: surname, patronymic: patronymic, bithdate: bithdate,  password: password}).then(res => {
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

    private getRolesKeyByValue(value: string): Roles {
        switch(value){
            case Roles.student.toString(): {
                return Roles.student
            }
            case Roles.worker.toString(): {
                return Roles.worker
            }
            case Roles.admin.toString(): {
                return Roles.admin
            }
            case Roles.teacher.toString(): {
                return Roles.teacher
            }
            default: {
                return Roles.user
            }
        }
      }

    private getInfo(): Promise<boolean> {
        return endpoint.user.info(this.Jwt!).then(res => {
            this.Email = res.email
            this.Name = res.name
            this.Surname = res.surname
            this.Patronymic = res.patronymic
            this.GroupName = res.groupName
            console.log(res.roles);
            this.Roles = res.roles.map((val: string) => {return this.getRolesKeyByValue(val)})
            console.log("orel", this.Roles);
            console.log(res.roles.map((val: string) => {return this.getRolesKeyByValue(val)}))
            this.saveInst()

        }).then(() => true)
    }

    private saveInst(): void {
        if (this.Jwt != null){
            localStorage.setItem(UserStorageItems.token, this.Jwt!)
            localStorage.setItem(UserStorageItems.name, this.Name!)
            localStorage.setItem(UserStorageItems.surname, this.Surname!)
            localStorage.setItem(UserStorageItems.patronymic, this.Patronymic!)
            localStorage.setItem(UserStorageItems.email, this.Email!)
            localStorage.setItem(UserStorageItems.group, this.GroupName!)
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
        localStorage.removeItem(UserStorageItems.group)
    }

    private getInst() : void{
        const token = localStorage.getItem(UserStorageItems.token)
        if (token != null){
            this.Jwt = token
            this.Email = localStorage.getItem(UserStorageItems.email)
            this.Name =  localStorage.getItem(UserStorageItems.name)
            this.Surname =  localStorage.getItem(UserStorageItems.surname)
            this.Patronymic =  localStorage.getItem(UserStorageItems.patronymic)
            this.GroupName =  localStorage.getItem(UserStorageItems.group)
            this.Roles =  localStorage.getItem(UserStorageItems.roles)!.split(this.separator).map((val: string) => {return this.getRolesKeyByValue(val)})
        }
        else{
            this.clear()
        }
    }
}

export default UserModel