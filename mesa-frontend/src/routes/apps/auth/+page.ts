
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
export const load = async() =>{
    let services = await UserService.findUsers()
    return {
        services: services,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}