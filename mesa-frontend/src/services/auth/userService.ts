import axios from "axios";
import Cookies from "js-cookie"

let api_users = 'http://192.168.90.90/api/auth/users'

export class UserService {
    static async findUsers() {
        let result = await axios.get(api_users, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        if (result.status == 200) {
            return result.data
        }
        return null
    }

    static async removeUser(user_id: string) {
        let result = await axios.delete(`${api_users}?user_id=${user_id}`, {
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

    static async createNewUser(email: string, password: string, is_admin: boolean) {
        let result = await axios.post(api_users, {
            "email": email,
            "password": password,
            "is_admin": is_admin
        }, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        if (result.status == 201 || result.status == 200) {
            return result.data
        }
        return null
    }
}