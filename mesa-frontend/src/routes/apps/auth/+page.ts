
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
import { PersonService } from "../../../services/person/personService"
import { AppsService } from "../../../services/auth/appsService"
export const load = async() =>{
    let users = await UserService.findUsers()
    let persons = await PersonService.findPersons()
    let services = await AppsService.findServices()
    return {
        services: services,
        persons: persons,
        users: users,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}