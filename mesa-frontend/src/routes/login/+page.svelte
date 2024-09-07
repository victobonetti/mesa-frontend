<script lang="ts">
	import { LoginService } from "../../services/auth/loginService";
	import { goto } from "$app/navigation";
	import { ServiceRequest } from "../../services/serviceRequest";
	import logo from "$lib/assets/logo.png";
	import { getContext } from "svelte";
	import { handleResponse } from "../../services/handleResponse";

	const { throwError } = getContext("notify");
	let email = "";
	let pass = "";
	let loading = false;
	const loginTrigger = async () => {
		if (email.trim() == "" || pass.trim() == "") {
			throwError("Existem campos em branco");
			return;
		}
		loading = true;

		let result = await ServiceRequest.call(() =>
			LoginService.doLogin(email, pass),
		);
		loading = false;
		let err = handleResponse(result, throwError);

		if (!err) {
			goto("/apps");
		}
	};
</script>

<div class=" h-96 w-96 border rounded shadow-lg bg-neutral-100 pt-8 flex flex-col items-center">
	<img class="w-64 mb-4" src={logo} alt="logo" />
	<div class="h-56 flex flex-col items-center justify-center p-8">
		{#if !loading}
			<div class="w-72 mb-2">
				<div class="relative w-full min-w-[200px] h-10">
					<input
						id="email"
						bind:value={email}
						type="text"
						class="peer w-full h-full bg-neutral-50 text-neutral-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-neutral-300 focus:border-gray-900"
						placeholder=" "
					/><label
						for="email"
						class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-neutral-500 peer-focus:text-neutral-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
						>Email
					</label>
				</div>
			</div>
			<div class="w-72 mb-4">
				<div class="relative w-full min-w-[200px] h-10">
					<input
						id="pass"
						bind:value={pass}
						type="password"
						class="peer w-full h-full bg-neutral-50 text-neutral-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-neutral-300 focus:border-gray-900"
						placeholder=" "
					/><label
						for="pass"
						class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-neutral-500 peer-focus:text-neutral-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
						>Senha
					</label>
				</div>
			</div>

			<button
				on:click={loginTrigger}
				autofocus
				class="text-center text-neutral-50 bg-neutral-800 w-32 py-2 px-6 rounded-full mb-4 cursor-pointer"
				>Login</button
			>
			<a
				href="/"
				class="text-sm hover:underline text-neutral-500 cursor-pointer"
				>Tela inicial</a
			>
		{:else}
			<h3 class=" select-none animate-pulse">Carregando...</h3>
		{/if}
	</div>
</div>
