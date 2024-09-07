import axios from "axios";

let api_services = 'http://192.168.90.90/api/auth/services'

export class AppsService{
    static async findServices(){
        let result = await axios.get(api_services)
        console.log(result)
        return result.data
    }
}