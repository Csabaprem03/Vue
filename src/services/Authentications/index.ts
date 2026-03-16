import type { LoginCredentials, RegisterData, User } from "../../types";
import http from '../api'
import type { APIResponse } from "../types";


async function Login(credentials: LoginCredentials) {
    return http.post<APIResponse<{ user: User, token: string }>>("login",credentials)
}

async function Register(register: RegisterData) {
    return http.post<APIResponse<null>>("register",register)
}

async function Logout() {
    return http.post<APIResponse<null>>('logout');
}

export default {
    Login,
    Register,
    Logout
}