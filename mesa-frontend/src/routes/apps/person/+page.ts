
import Cookies from "js-cookie"
import { PersonService } from "../../../services/person/personService"
export const load = async() =>{
    let persons = await PersonService.findPersons()
    return {
        persons: persons
    }
}