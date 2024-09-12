<script>
	// @ts-nocheck

	import { getContext } from "svelte";
	import Input from "../../../../components/Input.svelte";
	export let full_name = "";
	export let cpf = "";
	export let address = "";
	export let address_number = "";
	export let address_city = "";
	export let address_cep = "";
	export let phone = "";
	export let email = "";
	export let date_of_birth = "";

	export let type = "";
	export let minimize;
	export let close;
	export let create;
	export let deletes;

	const { showConfirm } = getContext("notify");

	const triggerDeletes = () => {
		showConfirm("Essa ação irá excluir a pessoa `" + full_name + "` permanentemente.", () =>
			deletes(),
		);
	};
</script>

<div
	class="relative z-20 bg-neutral-50 border-neutral-400 border rounded-tl shadow-2xl"
>
	<div class="p-4 min-w-md mx-auto">
		<div
			class="border-b border-neutral-300 pb-1 mb-2 w-full flex justify-between items-center"
		>
			{#if type == "create"}
				<h1 class="w-1/2 select-none text-neutral-600 min-w-96">
					Novo cadastro
				</h1>
			{/if}
			{#if type == "update"}
				<h1 class="w-1/2 select-none text-neutral-600 min-w-96">
					Edição de cadastro
				</h1>
			{/if}
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

		{#if type == "update"}{/if}
		<Input id="full_name" is_mandatory={true} label="Nome" bind:val={full_name} />
		<Input id="cpf" label="CPF" bind:val={cpf} />
		<Input id="address" label="Endereço" bind:val={address} />
		<Input id="address_number" label="Número" bind:val={address_number} />
		<Input id="address_city" label="Cidade" bind:val={address_city} />
		<Input id="address_cep" label="CEP" bind:val={address_cep} />
		<Input id="phone" label="Telefone" bind:val={phone} />
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
		<Input id="date_of_birth" label="Data Nasc. (dd-mm-aaa)" bind:val={date_of_birth} />
	</div>
	<div class="w-full flex justify-end pr-4">
		{#if type == "create"}
			<button
				on:click={create}
				class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-green-400 text-green-900"
				>Criar</button
			>
		{/if}

		{#if type == "update"}
			<button
				on:click={triggerDeletes}
				class=" mr-2 mb-3 rounded text-sm py-2 px-4 border border-red-400 shadow-inner bg-transparent text-red-400"
				>Excluir</button
			>
			<button
				on:click={create}
				class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-yellow-400 text-yellow-900"
				>Editar</button
			>
		{/if}
	</div>
</div>
