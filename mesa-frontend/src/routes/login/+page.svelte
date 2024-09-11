<script lang="ts">
	import { LoginService } from "../../services/auth/loginService";
	import { goto } from "$app/navigation";
	import { ServiceRequest } from "../../services/serviceRequest";
	import logo from "$lib/assets/logo.png";
	import { getContext } from "svelte";
	import { handleResponse } from "../../services/handleResponse";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Icon from "@iconify/svelte";

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

<div
	class=" h-96 w-96 border rounded shadow-lg bg-neutral-100 pt-8 flex flex-col items-center"
>
	<img class="w-64 mb-4" src={logo} alt="logo" />
	<div class="h-56 flex flex-col items-center justify-center p-8">
		{#if !loading}
			<div class="w-72 mb-6">
				<div class="relative w-full min-w-[200px] h-10">
					<Label for="email">Email</Label>
					<Input
						class="bg-neutral-50"
						id="email"
						bind:value={email}
						type="text"
					/>
				</div>
			</div>
			<div class="w-72 mb-12">
				<div class="relative w-full min-w-[200px] h-10">
					<Label for="pass">Senha</Label>
					<Input
						class="bg-neutral-50"
						id="pass"
						bind:value={pass}
						type="password"
					/>
				</div>
			</div>

			<Button on:click={loginTrigger} class="mb-2 w-32">Login</Button>
			<Button variant="link" class="text-xs"
				>Esqueci minha senha</Button
			>
		{:else}
			<div class="w-72 mb-6">
				<div class="relative w-full min-w-[200px] h-10">
					<Label for="email">Email</Label>
					<Input
						disabled
						class="bg-neutral-50"
						id="email"
						type="text"
					/>
				</div>
			</div>
			<div class="w-72 mb-12">
				<div class="relative w-full min-w-[200px] h-10">
					<Label for="pass">Senha</Label>
					<Input
						disabled
						class="bg-neutral-50"
						id="pass"
						type="password"
					/>
				</div>
			</div>

			<Button class="mb-2 w-32" disabled>
				Aguarde
				<Icon
					class="ml-2 text-lg"
					icon="svg-spinners:bars-rotate-fade"
				/>
			</Button>
			<Button variant="link" class="text-xs" disabled
				>Esqueci minha senha</Button
			>
		{/if}
	</div>
</div>
