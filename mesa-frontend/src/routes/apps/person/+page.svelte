<script lang="ts">
	import type INewPerson from "../../../services/person/INewPerson";
	import { PersonService } from "../../../services/person/personService";
	import NewPersonForm from "./components/NewPersonForm.svelte";

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
	let edit_full_name = "";
	let edit_cpf = "";
	let edit_address = "";
	let edit_address_number = "";
	let edit_address_city = "";
	let edit_address_cep = "";
	let edit_phone = "";
	let edit_email = "";
	let edit_date_of_birth = "";

	const createPerson = async () => {
		const personData: INewPerson = {
			full_name: full_name,
			cpf,
			address,
			address_number,
			address_city,
			address_cep,
			phone,
			email,
			date_of_birth: date_of_birth,
		};

		let result = await PersonService.createPerson(personData);
		if (result != null) {
			alert("Usuário criado.");
			persons = await PersonService.findPersons();
		}
	};

	const editPerson = (p:any) => {
		windows["editaPessoa"].closed = false;
		edit_full_name = p.full_name;
		edit_cpf = p.cpf;
		edit_address = p.address.street;
		edit_address_number = p.address.number;
		edit_address_city = p.address.city;
		edit_address_cep = p.address.cep;
		edit_phone = p.phone;
		edit_email = p.email;
		edit_date_of_birth = p.date_of_birth;
	};

	// // Minimize or close windows
	// const minimizeWindows = () => {
	//   for (let k in windows) {
	// 	windows[k].minimized = true;
	//   }
	// };

	// const closeWindows = () => {
	//   for (let k in windows) {
	// 	windows[k].closed = true;
	//   }
	// };

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
	};
</script>

<div class="w-screen h-screen p-8">
	<div class="h-16 w-full flex justify-between items-center">
		<div class="mb-4">
			<h1 class="select-none text-2xl mb-2">Pessoas cadastradas</h1>
			<p class=" select-none text-xs text-left text-neutral-600">
				Crie usuarios. Clique nas tabela para visualizar individualmente e editar. 
			</p>
		</div>
		<div>
			<a
				class="cursor-pointer px-4 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-50"
				on:click={() => {
					windows["novaPessoa"].closed = false;
					windows["novaPessoa"].minimized = false;
				}}
			>
				+ Nova pessoa
			</a>
		</div>
	</div>
	<div class="w-full border-t pt-6 flex flex-wrap gap-4">
		<table class="min-w-full bg-white border border-gray-300">
			<thead>
				<tr>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Nome</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>CPF</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Data Nasc</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Email</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Telefone</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Endereço</th
					>
					<th
						class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider"
						>Status</th
					>
				</tr>
			</thead>
			<tbody class="bg-white">
				{#each persons as p}
					<tr
						on:click={() => editPerson(p)}
						class="select-none bg-transparent hover:bg-neutral-100"
					>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.full_name}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.cpf}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.date_of_birth}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.email}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.phone}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.address.street}, {p.address.number}, {p.address
								.city}, {p.address.cep}</td
						>
						<td class="px-2 text-xs py-1 border-b border-gray-200"
							>{p.status}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<div class="absolute right-0 bottom-0 w-0 h-0 flex justify-end items-end">
	{#if windows["novaPessoa"].minimized && !windows["novaPessoa"].closed}
		<div
			on:click={() => (windows["novaPessoa"].minimized = false)}
			class=" relative z-20 p-2 h-32 w-16 bg-neutral-200 border-neutral-400 border rounded-t shadow-2xl"
		>
			<p class="select-none text-xs font-thin">Novo cadastro</p>
		</div>
	{/if}

	{#if windows["editaPessoa"].minimized && !windows["editaPessoa"].closed}
		<div
			on:click={() => (windows["editaPessoa"].minimized = false)}
			class="relative z-20 p-2 h-32 w-16 bg-neutral-200 border-neutral-400 border rounded-t shadow-2xl"
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
			create={createPerson}
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
			create={createPerson}
		/>
	{/if}
</div>
