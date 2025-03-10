interface UserInfo {
    Jwt?: string | null
    Name?: string | null
    Surname?: string | null
    Patronymic?: string | null
    Email?: string | null
    Roles: string[]
    login(email: string, password: string): void
    logout() : void
}

export default UserInfo