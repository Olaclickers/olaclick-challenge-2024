
interface User {
    id?: string,
    email: string,
    first_name: string,
    last_name: string,
    user_role: string,
}
export default interface AuthResponse {
    access_token: string,
    user: User

}

export interface UserResonse {
    user: User
}