import axios from "axios";
import { setCookie } from "../cookie";

let api_login = 'http://192.168.90.90/api/auth/users/login'

export class LoginService {
    static async doLogin(email: string, pass: string) {
        let result = await axios.post(api_login, { "email": email, "password": pass }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        setCookie('token', result.data['token'], 7)
        setCookie('tenantid', result.data['tenant_id'], 7)
        return result.data
    }
}