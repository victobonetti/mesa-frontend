import { AppsService } from "../../services/auth/appsService"
import Cookies from "js-cookie"
export const load = async() =>{
    let services = await AppsService.findServices()
    return {
        services: services,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}