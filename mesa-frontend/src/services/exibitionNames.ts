export const tocTrees = ["Segurança", "Cadastros", "Operacional"]

export function getExibitionName(service_name:string) {
    switch(service_name){
        case "auth":
            return "Usuários"
        case "person":
            return "Pessoas"
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
        default:
            return service_name
    }
}