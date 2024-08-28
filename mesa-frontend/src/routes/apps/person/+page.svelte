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
	};
  
	// Form data
	let full_name = '';
	let cpf = '';
	let address = '';
	let address_number = '';
	let address_city = '';
	let address_cep = '';
	let phone = '';
	let email = '';
	let date_of_birth = '';
  
	const createPerson = async() => {
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
  </script>
  
  <div class="h-16 w-full flex justify-between items-center">
	<h1 class="select-none text-2xl mb-2">Pessoas cadastradas</h1>
	<div>
	  <a
		class="cursor-pointer px-4 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-50"
		on:click={() => (windows["novaPessoa"].closed = false)}
	  >
		+ Nova pessoa
	  </a>
	</div>
  </div>
  <div class="w-full border-t pt-6 flex flex-wrap gap-4">
	<table class="min-w-full bg-white border border-gray-300">
	  <thead>
		<tr>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Nome</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">CPF</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Data Nasc</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Email</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Telefone</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Endereço</th>
		  <th class="px-2 py-1 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-neutral-600 uppercase tracking-wider">Status</th>
		</tr>
	  </thead>
	  <tbody class="bg-white">
		{#each persons as p}
		  <tr class="select-none bg-transparent hover:bg-neutral-100">
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.full_name}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.cpf}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.date_of_birth}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.email}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.phone}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.address.street}, {p.address.number}, {p.address.city}, {p.address.cep}</td>
			<td class="px-2 text-xs py-1 border-b border-gray-200">{p.status}</td>
		  </tr>
		{/each}
	  </tbody>
	</table>
  </div>
  
  {#if !windows["novaPessoa"].minimized && !windows["novaPessoa"].closed}
	<NewPersonForm
	  bind:full_name={full_name}
	  bind:cpf={cpf}
	  bind:address={address}
	  bind:address_number={address_number}
	  bind:address_city={address_city}
	  bind:address_cep={address_cep}
	  bind:phone={phone}
	  bind:email={email}
	  bind:date_of_birth={date_of_birth}
	  minimize={() => (windows["novaPessoa"].minimized = true)}
	  close={() => (windows["novaPessoa"].closed = true)}
	  create={createPerson}
	/>
  {/if}
  
  {#if windows["novaPessoa"].minimized && !windows["novaPessoa"].closed}
	<div
	  on:click={() => (windows["novaPessoa"].minimized = false)}
	  class="p-2 fixed right-0 bottom-0 h-32 w-16 bg-neutral-200 border-neutral-400 border rounded-tl shadow-2xl"
	>
	  <p class="select-none text-xs font-thin">Novo cadastro</p>
	</div>
  {/if}
  