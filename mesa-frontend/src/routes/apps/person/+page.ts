
import Cookies from "js-cookie"
import { PersonService } from "../../../services/person/personService"
import { ServiceRequest } from "../../../services/serviceRequest"
export const load = async () => {
    let persons = await ServiceRequest.call(() => PersonService.findPersons())
    console.log(persons)
    return {
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
        persons: persons.result
    }
}