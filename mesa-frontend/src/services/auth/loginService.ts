import axios from "axios";
import Cookies from "js-cookie"

// let api_login = 'http://192.168.90.90/api/auth/users/login'
let api_login = 'http://192.168.90.90/api/auth/users/login'

export class LoginService{
    static async doLogin(email: string, pass: string){
        let result = await axios.post(api_login, {"email": email, "password": pass})
        console.log(result)
        if (result.status == 200){
            Cookies.set('token', result.data['token'])
            Cookies.set('tenantid', result.data['tenant_id'])
            return true
        }
        return null
    }
}