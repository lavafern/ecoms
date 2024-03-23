import { JwtPayload } from "./jwtPayload";


export interface LoginResponse {
    token: string,
    user: JwtPayload
}