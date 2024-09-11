
import Cookies from "js-cookie"
import { UserService } from "../../../services/auth/userService"
import { PersonService } from "../../../services/person/personService"
import { AppsService } from "../../../services/auth/appsService"
import { ServiceRequest } from "../../../services/serviceRequest"
export const load = async () => {
    let users = await ServiceRequest.call(() => UserService.findUsers())
    let services = await ServiceRequest.call(() => AppsService.findServices())

    const findUserName = async (email: string) => {
		let userName = undefined
		let reqPerson = await ServiceRequest.call(() =>
			PersonService.findPersonByEmail(email),
		);
		if (!reqPerson.err) {
			let user = reqPerson.result;
			console.log(user["full_name"]);
			userName = user["full_name"];
		}
		return userName;
	};

    let usernames = {};
    if(users.result){
        for(let user of users.result) {
            let email = user["email"]
            let username = await findUserName(email)
            usernames[email] = username
        }
    }


    return {
        services: services.result,
        users: users.result,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
        usernames
    }
}