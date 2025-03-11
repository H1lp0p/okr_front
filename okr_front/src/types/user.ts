interface UserInfo {
    Jwt?: string | null
    Name?: string | null
    Surname?: string | null
    Patronymic?: string | null
    Email?: string | null
    Roles: Roles[]
    login(email: string, password: string): void
    logout() : void
}

enum Roles{
    student = "student",
    teacher = "teacher",
    worker = "worker",
    admin = "admin"
}

export default UserInfo
export {Roles}