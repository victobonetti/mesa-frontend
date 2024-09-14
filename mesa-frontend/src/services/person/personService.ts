import axios from "axios";
import Cookies from "js-cookie"
import type INewPerson from "./INewPerson";
import type { IEditPerson } from "./INewPerson";

let api_person = 'http://192.168.90.90/api/person'

export class PersonService {
    static async deletePerson(edit_id: string) {
        let result = await axios.delete(`${api_person}?id=${edit_id}`, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        return result.data
    }

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
        return result.data
    }

    static async findPersons(limit=2, page=1, searchQuery="") {
        let query = searchQuery
        let req_url = `${api_person}?limit=${limit}&page=${page}`
        if(query != ""){
            req_url += `&search=${query}`
        }

        let result = await axios.get(req_url, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        return result.data
    }

    static async findPersonByEmail(emails: string[]) {
        
        let args = ""
        let count = 0
        for(let e of emails){
            if(emails.length - 1 == count)
            args += `email=${e}&`
            count++
        }
        let result = await axios.get(`${api_person}?${args}`, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        return result.data
    }

    static async createPerson(person: INewPerson) {
        let result = await axios.post(api_person, person, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        return result.data
    }
}