<script lang="ts">
	import { goto } from "$app/navigation";
	import {
		getDescription,
		getExibitionName,
		getIcon,
		getTocTree,
		tocTrees,
	} from "../../services/exibitionNames.js";
	import * as Card from "$lib/components/ui/card";
	import Icon from "@iconify/svelte";
	export let data;
	let services = data.services;
</script>

<div>
	<h2
		class=" border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
	>
		Serviços disponíveis
	</h2>
	<div class=" w-full border-t pt-6 flex flex-wrap  p-2">
		{#if services}
			{#each tocTrees as tocTree}
				<h3 class="border-b w-full pb-2 tracking-tight transition-colors select-none text-neutral-700">{tocTree}</h3>
				<div class="w-full mb-4 flex gap-4">
					{#each services as s}
						{#if getTocTree(s["service_name"]) == tocTree}
						<button
							type="button"
							class="mt-4"
							on:click={() => goto(`/apps/${s["service_name"]}`)}
						>
							<Card.Root
								class=" w-72 cursor-pointer hover:border-neutral-900"
							>
								<Card.Header>
									<div class="w-full flex">
										<div class=" w-3/4 text-left">
											<Card.Title
												>{getExibitionName(
													s["service_name"],
												)}</Card.Title
											>
											<Card.Description
												>{getDescription(
													s["service_name"],
												)}</Card.Description
											>
										</div>
										<div
											class="w-1/4 flex items-center justify-center"
										>
											<Icon
												class="ml-2 text-4xl"
												icon={getIcon(
													s["service_name"],
												)}
											/>
										</div>
									</div>
								</Card.Header>
							</Card.Root>
						</button>
						{/if}
					{/each}
				</div>
			{/each}
		{/if}
	</div>
</div>
