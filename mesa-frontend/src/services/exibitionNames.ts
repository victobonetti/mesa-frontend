export function getExibitionName(service_name:string) {
    switch(service_name){
        case "auth":
            return "Usuários do domínio"
        case "person":
            return "Cadastro de pessoas"
        default:
            return service_name
    }
}