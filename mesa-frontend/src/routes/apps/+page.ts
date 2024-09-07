import { AppsService } from "../../services/auth/appsService"
import Cookies from "js-cookie"
import { ServiceRequest } from "../../services/serviceRequest"
import { handleResponse } from "../../services/handleResponse"
export const load = async () => {
    let services = await ServiceRequest.call(() => AppsService.findServices())
    return {
        services: services.result,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}