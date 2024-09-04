
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
import { PersonService } from "../../../services/person/personService"
export const load = async() =>{
    let users = await UserService.findUsers()
    let persons = await PersonService.findPersons()
    return {
        persons: persons,
        users: users,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}