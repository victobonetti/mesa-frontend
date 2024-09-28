export default interface INewProduct {
    name: string; 
    description: string; 
    search_code: number; 
    category_id: string; 
    NCM: string; 
    CFOP: string; 
    vProd: number;
}

export interface IEditProduct extends INewProduct {
    product_id: string;
}