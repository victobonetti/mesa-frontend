export default interface INewPerson {
    full_name: string;
    cpf: string;
    address: string;
    address_number: string;
    address_city: string;
    address_cep: string;
    phone: string;
    email: string;
    date_of_birth: string;
}

export interface IEditPerson extends INewPerson {
    id: string;
}