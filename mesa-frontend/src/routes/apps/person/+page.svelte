<script lang="ts">
	import { getContext } from "svelte";
	import type { IEditPerson } from "../../../services/person/INewPerson";
	import type INewPerson from "../../../services/person/INewPerson";
	import { PersonService } from "../../../services/person/personService";
	import NewPersonForm from "./components/NewPersonForm.svelte";
	import { ServiceRequest } from "../../../services/serviceRequest";
	import { handleResponse } from "../../../services/handleResponse";
	import Button from "$lib/components/ui/button/button.svelte";
	import Icon from "@iconify/svelte";
    import DataTable from "./dataTable.svelte";


	const { throwError, showSuccess } = getContext("notify");

	// exports
	export let data;
	let persons = data.persons;

	// Active windows state
	let windows = {
		novaPessoa: {
			minimized: false,
			closed: true,
		},
		editaPessoa: {
			minimized: false,
			closed: true,
		},
	};

	// Form data
	let full_name = "";
	let cpf = "";
	let address = "";
	let address_number = "";
	let address_city = "";
	let address_cep = "";
	let phone = "";
	let email = "";
	let date_of_birth = "";

	// Form data edit
	let edit_id = "";
	let edit_full_name = "";
	let edit_cpf = "";
	let edit_address = "";
	let edit_address_number = "";
	let edit_address_city = "";
	let edit_address_cep = "";
	let edit_phone = "";
	let edit_email = "";
	let edit_date_of_birth = "";

	const refreshPersons = async (refreshWindow: string) => {
		let reqPersons = await ServiceRequest.call(() =>
			PersonService.findPersons(),
		);
		handleResponse(reqPersons, throwError);
		closeWindow(refreshWindow);
		persons = reqPersons.result;
	};

	const createPerson = async () => {
		const personData: INewPerson = {
			full_name,
			cpf,
			address,
			address_number,
			address_city,
			address_cep,
			phone,
			email,
			date_of_birth,
		};

		let reqCreatePerson = await ServiceRequest.call(() =>
			PersonService.createPerson(personData),
		);
		let errCreatePerson = handleResponse(reqCreatePerson, throwError);
		if (!errCreatePerson) {
			refreshPersons("novaPessoa");
		}
	};

	const editPerson = async () => {
		const personData: IEditPerson = {
			id: edit_id,
			full_name: edit_full_name,
			cpf: edit_cpf,
			address: edit_address,
			address_number: edit_address_number,
			address_city: edit_address_city,
			address_cep: edit_address_cep,
			phone: edit_phone,
			email: edit_email,
			date_of_birth: edit_date_of_birth,
		};

		let result = await ServiceRequest.call(() =>
			PersonService.editPerson(personData),
		);
		let err = handleResponse(result, throwError);
		if (!err) {
			refreshPersons("editaPessoa");
		}
	};

	const deletePerson = async () => {
		let result = await ServiceRequest.call(() =>
			PersonService.deletePerson(edit_id),
		);
		let err = handleResponse(result, throwError);
		if (!err) {
			refreshPersons("editaPessoa");
		}
	};

	const editPersonModalActive = (p: any) => {

		let person = p["original"]

		windows["editaPessoa"].closed = false;
		edit_id = person.id;
		edit_full_name = person.full_name;
		edit_cpf = person.cpf;
		edit_address = person.address.street;
		edit_address_number = person.address.number;
		edit_address_city = person.address.city;
		edit_address_cep = person.address.cep;
		edit_phone = person.phone;
		edit_email = person.email;
		edit_date_of_birth = person.date_of_birth;
	};

	const closeWindow = (windowName: string) => {
		if (windowName == "novaPessoa") {
			full_name = "";
			cpf = "";
			address = "";
			address_number = "";
			address_city = "";
			address_cep = "";
			phone = "";
			email = "";
			date_of_birth = "";
			windows["novaPessoa"].closed = true;
		}

		if (windowName == "editaPessoa") {
			edit_id = "";
			edit_full_name = "";
			edit_cpf = "";
			edit_address = "";
			edit_address_number = "";
			edit_address_city = "";
			edit_address_cep = "";
			edit_phone = "";
			edit_email = "";
			edit_date_of_birth = "";
			windows["editaPessoa"].closed = true;
		}
	};
</script>

<div>
	<div class=" w-full flex justify-between items-center">
		<div class="mb-4">
			<h2
				class=" pb-2 text-2xl font-semibold tracking-tight transition-colors"
			>
				Pessoas cadastradas
			</h2>
			<p class=" select-none text-xs text-left text-neutral-600">
				Crie pessoas. Clique nas tabelas para visualizar individualmente
				e editar.
			</p>
		</div>
		<div>
			<Button
				on:click={() => {
					windows["novaPessoa"].closed = false;
					windows["novaPessoa"].minimized = false;
				}}
			>
				<Icon class="text-lg mr-1 mt-0.5" icon="material-symbols:add" />
				Nova pessoa
			</Button>
		</div>
	</div>
	<div class="w-full border-t pt-6 flex flex-wrap gap-4">
		<div class="rounded-md border w-full">
			{#if persons}
				<DataTable 
					editPersonModalActive={editPersonModalActive}
					persons={persons}
				/>
			{/if}
		</div>
	</div>
</div>

<div class="absolute right-0 bottom-0 w-0 h-0 flex justify-end items-end">
	{#if windows["novaPessoa"].minimized && !windows["novaPessoa"].closed}
		<div
			on:click={() => (windows["novaPessoa"].minimized = false)}
			class=" relative z-20 p-2 h-32 w-16 bg-neutral-50 border-neutral-400 border rounded-t shadow-2xl"
		>
			<p class="select-none text-xs font-thin">Novo cadastro</p>
		</div>
	{/if}

	{#if windows["editaPessoa"].minimized && !windows["editaPessoa"].closed}
		<div
			on:click={() => (windows["editaPessoa"].minimized = false)}
			class="relative z-20 p-2 h-32 w-16 bg-neutral-50 border-neutral-400 border rounded-t shadow-2xl"
		>
			<p class="select-none text-xs font-thin">Editar cadastro</p>
		</div>
	{/if}

	{#if !windows["novaPessoa"].minimized && !windows["novaPessoa"].closed}
		<NewPersonForm
			bind:full_name
			bind:cpf
			bind:address
			bind:address_number
			bind:address_city
			bind:address_cep
			bind:phone
			bind:email
			bind:date_of_birth
			minimize={() => (windows["novaPessoa"].minimized = true)}
			close={() => closeWindow("novaPessoa")}
			type="create"
			create={createPerson}
			deletes={deletePerson}
		/>
	{/if}

	{#if !windows["editaPessoa"].minimized && !windows["editaPessoa"].closed}
		<NewPersonForm
			bind:full_name={edit_full_name}
			bind:cpf={edit_cpf}
			bind:address={edit_address}
			bind:address_number={edit_address_number}
			bind:address_city={edit_address_city}
			bind:address_cep={edit_address_cep}
			bind:phone={edit_phone}
			bind:email={edit_email}
			bind:date_of_birth={edit_date_of_birth}
			minimize={() => (windows["editaPessoa"].minimized = true)}
			close={() => closeWindow("editaPessoa")}
			type="update"
			create={editPerson}
			deletes={deletePerson}
		/>
	{/if}
</div>
