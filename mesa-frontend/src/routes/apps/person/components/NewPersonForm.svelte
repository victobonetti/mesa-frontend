<script>
	// @ts-nocheck

	import Input from "../../../../components/Input.svelte";
	export let full_name = '';
	export let cpf = '';
	export let address = '';
	export let address_number = '';
	export let address_city = '';
	export let address_cep = '';
	export let phone = '';
	export let email = '';
	export let date_of_birth = '';
	
	export let minimize;
	export let close;
	export let create;


</script>

<div
	class="fixed right-0 bottom-0 bg-neutral-200 border-neutral-400 border rounded-tl shadow-2xl"
>
	<div class="p-4 min-w-md mx-auto">
		<div
			class="border-b border-neutral-300 pb-1 mb-2 w-full flex justify-between items-center"
		>
			<h1 class="w-1/2 select-none text-neutral-600 min-w-96">
				Novo cadastro
			</h1>
			<div class=" flex w-1/2 items-center justify-center font-thin">
				<p
					on:click={minimize}
					class="cursor-pointer hover:text-blue-800 mr-4 text-4xl"
				>
					-
				</p>
				<p
					on:click={close}
					class="cursor-pointer hover:text-rose-800 text-2xl"
				>
					x
				</p>
			</div>
		</div>

		<Input id="full_name" label="Nome"        bind:val={full_name} />
		<Input id="cpf" label="CPF" 		      bind:val={cpf} />
		<Input id="address" label="Endereço" 	  bind:val={address} />
		<Input id="address_number" label="Número" bind:val={address_number} />
		<Input id="address_city" label="Cidade"   bind:val={address_city} />
		<Input id="address_cep" label="CEP"       bind:val={address_cep} />
		<Input id="phone" label="Telefone"        bind:val={phone} />
		<div class="mb-4">
			<label
				for="email"
				class="block text-xs font-medium text-neutral-700">Email</label
			>
			<input
				placeholder=""
				type="email"
				id="email"
				bind:value={email}
				class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
			/>
		</div>
		<div class="mb-4">
			<label
				for="date_of_birth"
				class="block text-xs font-medium text-neutral-700"
				>Data Nasc.</label
			>
			<input
				placeholder=""
				type="date"
				id="date_of_birth"
				bind:value={date_of_birth}
				class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
			/>
		</div>
	</div>
	<div class="w-full flex justify-end pr-4">
		<button
			on:click={create}
			class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-green-400 text-green-900"
			>Criar</button
		>
	</div>
</div>
