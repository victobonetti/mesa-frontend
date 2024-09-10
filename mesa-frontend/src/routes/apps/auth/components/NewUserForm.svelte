<script>
	// @ts-nocheck

	import Input from "../../../../components/Input.svelte";
	export let email = "";
	export let pass = "";
	export let isAdmin = false;

	export let close;
	export let create;
</script>

<div
	class="relative z-20 bg-neutral-200 border-neutral-400 border rounded-tl shadow-2xl"
>
	<div class="p-4 min-w-md mx-auto">
		<div
			class="border-b border-neutral-300 pb-1 mb-2 w-full flex justify-between items-center"
		>
			<h1 class="w-1/2 select-none text-neutral-600 min-w-96">
				Novo usuário
			</h1>
			<div class=" flex w-1/2 items-center justify-center font-thin">
				<p
					on:click={close}
					class="cursor-pointer hover:text-rose-800 text-2xl"
				>
					x
				</p>
			</div>
		</div>

		<div class="mb-4">
			<label
				for="email"
				class="flex text-xs font-medium text-neutral-700">Email<p class="ml-1 text-red-500 text-xs">*</p></label
			>
			<input
				placeholder=""
				type="email"
				id="email"
				bind:value={email}
				class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
			/>
		</div>
		<Input id="pass" label="Senha" is_mandatory={true} bind:val={pass} />
		<div class="mb-4 flex items-center">
			<label
				for="email"
				class="flex text-xs font-medium text-neutral-700"
				>Usuário privilegiado</label
			>
			<input
				placeholder=""
				type="checkbox"
				id="email"
				bind:value={isAdmin}
				class="ml-2 mt-0.5 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
			/>
		</div>
		<p class="text-neutral-500 text-xs select-none">Usuário privilegiado tem todas as permissões habilitadas</p>
	</div>
	<div class="w-full flex justify-end pr-4">
		<button
			on:click={create}
			class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-green-400 text-green-900"
			>Criar</button
		>
	</div>
</div>
