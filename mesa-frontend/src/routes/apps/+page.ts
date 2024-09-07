import { AppsService } from "../../services/auth/appsService"
import Cookies from "js-cookie"
import { ServiceRequest } from "../../services/serviceRequest"
export const load = async () => {
    let services = await ServiceRequest.call(() => AppsService.findServices())
    return {
        services: services,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}