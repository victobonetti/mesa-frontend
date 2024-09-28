
import Cookies from "js-cookie"
import { redirect } from "@sveltejs/kit"
import { ServiceRequest } from "../../../../services/serviceRequest"
import { ProductsService } from "../../../../services/auth/productsService"
export const load = async () => {
    let products = await ServiceRequest.call(() => ProductsService.findProducts())
    let categories = await ServiceRequest.call(() => ProductsService.findCategories())

    if(products.err){
        redirect(302, '/apps')
    }

    console.log(products.result)
    return {
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token'),
        products_pagination: products.result,
        categories: categories.result
    }
}