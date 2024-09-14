
import Cookies from "js-cookie"
import { PersonService } from "../../../services/person/personService"
import { ServiceRequest } from "../../../services/serviceRequest"
import { redirect } from "@sveltejs/kit"
export const load = async () => {
    let persons = await ServiceRequest.call(() => PersonService.findPersons())

    if(persons.err){
        redirect(302, '/apps')
    }
    return {
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
        persons_pagination: persons.result
    }
}