import axios from "axios";
import Cookies from "js-cookie"
import type INewPerson from "./INewPerson";
import type { IEditPerson } from "./INewPerson";

let api_person = 'http://192.168.90.90/api/person/'

export class PersonService {
    static async editPerson(personData: IEditPerson) {
        let result = await axios.put(api_person, {
            "person_id": personData.id,
            "full_name": personData.full_name,
            "cpf": personData.cpf,
            "address": personData.address,
            "address_number": personData.address_number,
            "address_city": personData.address_city,
            "address_cep": personData.address_cep,
            "phone": personData.phone,
            "email": personData.email,
            "date_of_birth": personData.date_of_birth
        }, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        if (result.status == 201) {
            return true
        }
        return null
    }

    static async findPersons() {
        let result = await axios.get(api_person, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        console.log(result.data)
        if (result.status == 200) {
            return result.data
        }
        return null
    }

    static async createPerson(person: INewPerson) {
        console.log(person)
        let result = await axios.post(api_person, person, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        if (result.status == 201) {
            return result.data
        }
        return null
    }
}