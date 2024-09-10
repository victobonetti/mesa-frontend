<script lang="ts">
	import { goto } from "$app/navigation";
	import { getExibitionName } from "../../services/exibitionNames.js";

	export let data;

	let services = data.services;
	if (!data.tenantId || !data.token) {
		goto("/login");
	}
</script>

<div class="w-screen h-screen p-12">
	<h1 class=" select-none text-2xl mb-2">Serviços disponíveis</h1>
	<div class=" w-full border-t pt-6 flex flex-wrap gap-4">
		{#if services}
			{#each services as s}
				<button
					on:click={() => goto(`/apps/${s["service_name"]}`)}
					class=" hover:scale-105 cursor-pointer flex items-center justify-center border border-slate-300 text-slate-800 select-none h-24 w-48 font-thin text-xl"
					>{getExibitionName(s["service_name"])}</button
				>
			{/each}
		{/if}
	</div>
</div>
