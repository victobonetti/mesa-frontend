
import Cookies from "js-cookie"
import { ServiceRequest } from "../../../../services/serviceRequest"
import { ProductsService } from "../../../../services/auth/productsService"
import { redirect } from "@sveltejs/kit"

export const load = async () => {
    let categories = await ServiceRequest.call(() => ProductsService.findCategories())

    if(categories.err){
        redirect(302, '/apps/products')
    }

    return {
        categories: categories.result,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}