export const tocTrees = ["Segurança", "Cadastros", "Operacional"]

export function getExibitionName(service_name:string) {
    switch(service_name){
        case "auth":
            return "Usuários"
        case "person":
            return "Pessoas"
        case "products":
            return "Produtos e Insumos"
        default:
            return service_name
    }
}

export function getTocTree(service_name:string) {
    switch(service_name){
        case "auth":
            return "Segurança"
        case "person":
            return "Cadastros"
        case "products":
            return "Cadastros"
        default:
            return service_name
    }
}

export function getDescription(service_name:string){
    switch(service_name){
        case "auth":
            return "Autenticação e permissões"
        case "person":
            return "Cadastro de informações"
        case "products":
            return "Cadastro, ficha técnica, fiscal"
        default:
            return service_name
    }
}

export function getIcon(service_name:string){
    switch(service_name){
        case "auth":
            return "material-symbols:lock-person-outline"
        case "person":
            return "material-symbols:person"
        case "products":
            return "mdi:food"
        default:
            return service_name
    }
}