
import Cookies from "js-cookie"
import { PersonService } from "../../../services/person/personService"
export const load = async() =>{
    let persons = await PersonService.findPersons()
    console.log(persons)
    return {
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
        persons: persons
    }
}