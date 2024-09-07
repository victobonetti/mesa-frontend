import axios from "axios";
import Cookies from "js-cookie";

let api_grants = 'http://192.168.90.90/api/auth/users/grants'

enum GrantLevel {
    "read",
    "write",
    "admin"
}

export class GrantsService {
    static async findGrants(user_id: string) {
        let result = await axios.get(`${api_grants}?user_id=${user_id}`, {
            headers: {
                'X-Tenant-ID': Cookies.get('tenantid'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        return result.data

    }

    static async addGrant(user_id: string, level: GrantLevel, service: string) {
        let result = await axios.post(api_grants, {
            "service_name": service,
            "user_id": user_id,
            "grant_level": level
        },
            {
                headers: {
                    'X-Tenant-ID': Cookies.get('tenantid'),
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
        return result.data
    }

    static async removeGrant( grant_id: string) {
        let result = await axios.delete(`${api_grants}?grant_id=${grant_id}`,
            {
                headers: {
                    'X-Tenant-ID': Cookies.get('tenantid'),
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
        return result.data

    }
}