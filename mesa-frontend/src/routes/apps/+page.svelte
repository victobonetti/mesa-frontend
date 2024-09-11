<script lang="ts">
	import { goto } from "$app/navigation";
	import { getExibitionName } from "../../services/exibitionNames.js";
	import * as Card from "$lib/components/ui/card";
	import Icon from "@iconify/svelte";
	export let data;

	let services = data.services;
	if (!data.tenantId || !data.token) {
		goto("/login");
	}
</script>

<div class="w-screen h-screen p-12">
	<h2
		class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Serviços disponíveis
	</h2>
	<div class=" w-full border-t pt-6 flex flex-wrap gap-4">
		{#if services}
			{#each services as s}
				<Card.Root
					class=" w-64 cursor-pointer hover:border-neutral-900"
					on:click={() => goto(`/apps/${s["service_name"]}`)}
				>
					<Card.Header>
						<div class="w-full flex">
							<div class=" w-3/4">
								<Card.Title
									>{getExibitionName(
										s["service_name"],
									)}</Card.Title
								>
								<Card.Description
									>{getExibitionName(
										s["service_name"],
									)}</Card.Description
								>
							</div>
							<div class="w-1/4 flex items-center justify-center">
								<Icon
									class="ml-2 text-4xl"
									icon="material-symbols:lock-person-outline"
								/>
							</div>
						</div>
					</Card.Header>
				</Card.Root>
			{/each}
		{/if}
	</div>
</div>
