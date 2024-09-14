
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
import { PersonService } from "../../../services/person/personService"
import { AppsService } from "../../../services/auth/appsService"
import { ServiceRequest } from "../../../services/serviceRequest"
import { redirect } from "@sveltejs/kit"
export const load = async () => {
    console.log(Cookies.get('tenantid'))
    let users = await ServiceRequest.call(() => UserService.findUsers())
    let services = await ServiceRequest.call(() => AppsService.findServices())
    let emails = []

    if(users.err || services.err){
        redirect(302, '/apps')
    }
    
    for (let u of users.result) {
        emails.push(u['email'])
    }

    let person_data = await ServiceRequest.call(() => PersonService.findPersonByEmail(emails))
    let formatted_users = []


    for (let user of users.result) {
        user['full_name'] = null
        for (let person of person_data.result.persons) {
            if (person['email'] == user['email']) {
                user['full_name'] = person['full_name']
            }
        }
        formatted_users.push(user)
    }

    return {
        services: services.result,
        users: formatted_users,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
    }
}