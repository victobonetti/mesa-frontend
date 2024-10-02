
import Cookies from "js-cookie"
import { ServiceRequest } from "../../../../services/serviceRequest"
import { ProductsService } from "../../../../services/auth/productsService"
import { redirect } from "@sveltejs/kit"

export const load = async () => {
    let ingredients = await ServiceRequest.call(() => ProductsService.getIncredients())

    if(ingredients.err){
        redirect(302, '/apps/products')
    }

    return {
        ingredients: ingredients.result,
        tenantId: Cookies.get('tenantid'),
        token: Cookies.get('token')
    }
}