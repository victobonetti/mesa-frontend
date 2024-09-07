
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
import { PersonService } from "../../../services/person/personService"
import { AppsService } from "../../../services/auth/appsService"
import { ServiceRequest } from "../../../services/serviceRequest"
export const load = async () => {
    let users = await ServiceRequest.call(() => UserService.findUsers())
    let persons = await ServiceRequest.call(() => PersonService.findPersons())
    let services = await ServiceRequest.call(() => AppsService.findServices())
    return {
        services: services.result,
        persons: persons.result,
        users: users.result,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}