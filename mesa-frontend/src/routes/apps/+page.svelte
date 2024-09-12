<script lang="ts">
	import { goto } from "$app/navigation";
	import {
		getDescription,
		getExibitionName,
		getIcon,
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
	<div class=" w-full border-t pt-6 flex flex-wrap gap-4">
		{#if services}
			{#each services as s}
				<button type="button" on:click={() => goto(`/apps/${s["service_name"]}`)}>
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
										icon={getIcon(s["service_name"])}
									/>
								</div>
							</div>
						</Card.Header>
					</Card.Root>
				</button>
			{/each}
		{/if}
	</div>
</div>
