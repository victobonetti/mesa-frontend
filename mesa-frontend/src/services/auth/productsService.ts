import axios from "axios";
import Cookies from "js-cookie";
import type INewProduct from "./INewProduct";
import type { IEditProduct } from "./INewProduct";

let api_products = "http://192.168.90.90/api/products";

export class ProductsService {
  static async findProducts(limit = 2, page = 1, searchQuery = "") {
    let query = searchQuery;
    let req_url = `${api_products}?limit=${limit}&page=${page}`;
    if (query != "") {
      req_url += `&search=${query}`;
    }

    let result = await axios.get(req_url, {
      headers: {
        "X-Tenant-ID": Cookies.get("tenantid"),
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return result.data;
  }

  static async removeProduct(prod_id: string) {
    let result = await axios.delete(`${api_products}?id=${prod_id}`, {
      headers: {
        "X-Tenant-ID": Cookies.get("tenantid"),
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return result.data;
  }

  static async createNewProduct(data: INewProduct) {
    console.log(data);

    let result = await axios.post(
      api_products,
      {
        name: data.name,
        description: data.description,
        search_code: data.search_code,
        category_id: data.category_id,
        NCM: data.NCM,
        CFOP: data.CFOP,
        vProd: data.vProd,
      },
      {
        headers: {
          "X-Tenant-ID": Cookies.get("tenantid"),
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return result.data;
  }

  static async editProduct(data: IEditProduct) {
    let result = await axios.put(
      api_products,
      {
        product_id: data.product_id,
        name: data.name,
        description: data.description,
        search_code: data.search_code,
        category_id: data.category_id,
        NCM: data.NCM,
        CFOP: data.CFOP,
        vProd: data.vProd,
      },
      {
        headers: {
          "X-Tenant-ID": Cookies.get("tenantid"),
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return result.data;
  }

  static async findCategories() {
    let result = await axios.get(`${api_products}/categories`, {
      headers: {
        "X-Tenant-ID": Cookies.get("tenantid"),
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return result.data;
  }

  static async createCategory(name: string) {
    let result = await axios.post(
      `${api_products}/categories`,
      {
        name: name,
      },
      {
        headers: {
          "X-Tenant-ID": Cookies.get("tenantid"),
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return result.data;
  }

  static async editCategory(
    id: string,
    name: string,
    default_cfop: string,
    default_ncm: string,
    is_composed: boolean,
    max_compose_size: number
  ) {
    let result = await axios.put(
      `${api_products}/categories`,
      {
        category_id: id,
        name: name,
        default_cfop: default_cfop,
        default_ncm: default_ncm,
        is_composed: Boolean(is_composed),
        max_compose_size: max_compose_size,
      },
      {
        headers: {
          "X-Tenant-ID": Cookies.get("tenantid"),
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return result.data;
  }

  static async removeCategory(id: string) {
    let result = await axios.delete(`${api_products}/categories?id=${id}`, {
      headers: {
        "X-Tenant-ID": Cookies.get("tenantid"),
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return result.data;
  }

  static async getIncredients() {
    let result = await axios.get(`${api_products}/ingredients`, {
      headers: {
        "X-Tenant-ID": Cookies.get("tenantid"),
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return result.data;
  }

  static async createIngredient(
    name: string,
    unit: string,
    unit_value: string,
    children_ingredients:
      | { id: string; qtd: number; target_unit: string }[]
      | null
  ) {
    let body: {
        name: string
        unit: string
        unit_value: string | null
        children_ingredients: { id: string; qtd: number; target_unit: string }[] | null
    } = {
      name: name,
      unit: unit,
      unit_value: null,
      children_ingredients: null,
    };

    if (!children_ingredients) {
      body.unit_value = unit_value;
    } else {
      body.children_ingredients = children_ingredients;
    }

    let result = await axios.post(
      `${api_products}/ingredients`,
      body, 
      {
        headers: {
          "X-Tenant-ID": Cookies.get("tenantid"),
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return result.data;
  }
}
