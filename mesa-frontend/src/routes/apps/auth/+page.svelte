<script lang="ts">
	// imports
	import NewUserForm from "./components/NewUserForm.svelte";
	import { GrantsService } from "../../../services/auth/grantsService.js";
	import { UserService } from "../../../services/auth/userService.js";
	import { getExibitionName } from "../../../services/exibitionNames.js";
	import { ServiceRequest } from "../../../services/serviceRequest";
	import { getContext } from "svelte";
	import { handleResponse } from "../../../services/handleResponse";
	import { Button } from "$lib/components/ui/button";
	import Icon from "@iconify/svelte";
	import * as Table from "$lib/components/ui/table";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	// exports
	export let data;
	const { throwError, showSuccess, showConfirm } = getContext("notify");
	let users = data.users;
	let services = data.services;

	// vars
	let selected_user_id = "";
	let grant_opts: any[] = [];
	let grantsWindowActive = false;
	let isSuperAdmin: boolean = true;
	let email = "";
	let pass = "";
	let isAdmin = false;
	let newUserWindowActive = false;

	const createNewUser = async () => {
		newUserWindowActive = false;
		let result = await ServiceRequest.call(() =>
			UserService.createNewUser(email, pass, isAdmin),
		);
		let err = handleResponse(result, throwError);
		if (!err) {
			let reqUsers = await ServiceRequest.call(() =>
				UserService.findUsers(),
			);
			let usersErr = handleResponse(reqUsers, throwError);
			if (!usersErr) {
				users = reqUsers.result;
			}
		}
		email = "";
		pass = "";
		isAdmin = false;
	};

	const getServicesObject = (grants: any[]) => {
		let temp_map = [];
		if (services) {
			for (let service of services) {
				let grant_level = 0;
				let grant_id = "";
				if (grants) {
					for (let grant of grants) {
						if (grant["service_name"] == service["service_name"]) {
							grant_level = grant["grant_level"];
							grant_id = grant["id"];
						}
					}
				}

				let service_exibition_name = getExibitionName(
					service["service_name"],
				);
				temp_map.push({
					service: service["service_name"],
					service_exibition_name,
					grant_level,
					grant_id,
				});
			}
		}

		return temp_map;
	};

	const grantsMap = async () => {
		isSuperAdmin = false;
		let reqGrants = await ServiceRequest.call(() =>
			GrantsService.findGrants(selected_user_id),
		);
		let err = handleResponse(reqGrants, throwError);
		if (!err) {
			if (
				reqGrants.result.length > 0 &&
				reqGrants.result[0]["service_name"] == "*"
			) {
				isSuperAdmin = true;
			}
			grant_opts = getServicesObject(reqGrants.result);
			grantsWindowActive = true;
		}
	};

	const openGrantsWindow = (user_id: string) => {
		grantsWindowActive = false;
		selected_user_id = user_id;
		grantsMap();
	};

	const change_grant = async (
		e: MouseEvent,
		grant_level: number,
		actual_state: boolean,
		grant_id: string,
		service: string,
	) => {
		e.preventDefault();

		let errServices;
		let errGrants;

		if (actual_state == false) {
			let reqServices = await ServiceRequest.call(() =>
				GrantsService.addGrant(selected_user_id, grant_level, service),
			);
			errServices = handleResponse(reqServices, throwError);
		}

		if (actual_state == true && grant_id != "") {
			let reqGrants = await GrantsService.removeGrant(grant_id);
			errGrants = handleResponse(reqGrants, throwError);
		}

		if (!errGrants && !errServices) {
			grantsMap();
		}
	};

	const triggerDeleteUser = (user_id: string) => {
		showConfirm("Essa ação irá excluir o usuário permanentemente.", () =>
			deleteUser(user_id),
		);
	};

	const deleteUser = async (user_id: string) => {
		let result = await ServiceRequest.call(() =>
			UserService.removeUser(user_id),
		);
		handleResponse(result, throwError);
		let usersReq = await ServiceRequest.call(() => UserService.findUsers());
		let err = handleResponse(usersReq, throwError);
		if (!err) {
			users = usersReq.result;
		}
	};
</script>

<div>
	<div class="mb-4 flex">
		<div class="w-1/2">
			<h1
				class=" pb-2 text-2xl font-semibold tracking-tight transition-colors"
			>
				Usuários do domínio
			</h1>
			<p class=" select-none text-xs text-left text-neutral-600">
				Gerencie usuários com acesso ao sistema; O email do registro irá
				obter as informações cadastradas no módulo de cadastro de
				pessoas.
			</p>
		</div>
		<div class="w-1/2 h-12 flex justify-end items-end">
			<!-- material-symbols:add -->
			<Button on:click={() => (newUserWindowActive = true)}>
				<Icon class="text-lg mr-1 mt-0.5" icon="material-symbols:add" />
				Novo usuário
			</Button>
		</div>
	</div>
	<div class=" w-full border-t pt-6 flex-wrap gap-4 flex">
		<div class=" flex flex-col items-center">
			{#if users}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Nome</Table.Head>
							<Table.Head>Email</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each users as u}
							<Table.Row>
								{#if u["full_name"]}
									<Table.Cell class="font-medium"
										>{u["full_name"]}</Table.Cell
									>
								{:else}
									<Table.Cell class="text-red-500"
										>Usuário sem registro</Table.Cell
									>
								{/if}
								<Table.Cell>{u["email"]}</Table.Cell>
								<Table.Cell class="text-right"
									><DropdownMenu.Root>
										<DropdownMenu.Trigger
											asChild
											let:builder
										>
											<Button
												builders={[builder]}
												variant="outline">Opções</Button
											>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<DropdownMenu.Label
													>Editar</DropdownMenu.Label
												>
												<DropdownMenu.Separator />
												<DropdownMenu.Item
													on:click={() =>
														openGrantsWindow(
															u["id"],
														)}
													class="cursor-pointer"
													>Ver permissões</DropdownMenu.Item
												>
												<DropdownMenu.Item
													on:click={() =>
														triggerDeleteUser(
															u["id"],
														)}
													class=" cursor-pointer text-red-500"
													>Remover</DropdownMenu.Item
												>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root></Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</div>
		{#if grantsWindowActive}
			<div
				class=" pt-3 px-4 shadow-sm ml-12 border-2 border-gray-500 rounded w-1/2 min-w-96 bg-neutral-50"
			>
				<h2 class=" select-none mb-1 font-semibold">
					Permissões do usuário
				</h2>
				<p
					class=" select-none text-xs text-left text-neutral-600 border-b pb-1"
				>
					É permitida apenas uma permissão por serviço; Clique na
					checkbox para adicionar ou remover a permissão.
				</p>
				<div class="p-2">
					{#if isSuperAdmin}
						<div class=" border-b mb-2">
							<h3 class=" text-sm font-light select-none">
								Super Admin
							</h3>
							<div class="flex flex-col mb-2 mt-1">
								<div class="flex">
									<input
										checked={isSuperAdmin}
										id="superadmin"
										type="checkbox"
										disabled
									/>
									<label
										class="text-xs ml-0.5 flex opacity-80"
										for="superadmin"
										>Habilitado
										<p class="text-xs text-red-500">
											*
										</p></label
									>
								</div>
								<p class="text-red-500 text-xs">
									* Todas as permissões habilitadas
								</p>
							</div>
						</div>
					{/if}
					<div>
						{#if !isSuperAdmin}
							<h2
								class=" select-none text-neutral-800 font-medium"
							>
								Serviços
							</h2>
							{#if grant_opts}
								{#each grant_opts as g}
									<h3
										class=" mt-2 text-sm font-light select-none"
									>
										{g["service_exibition_name"]}
									</h3>
									<div class="flex mt-1">
										<div>
											<input
												id="read"
												type="checkbox"
												checked={g["grant_level"] == 4}
												on:click={(e) =>
													change_grant(
														e,
														4,
														g["grant_level"] == 4,
														g["grant_id"],
														g["service"],
													)}
											/>
											<label
												class="text-xs ml-0.5"
												for="read">Leitura</label
											>
										</div>
										<div class="ml-4">
											<input
												id="write"
												type="checkbox"
												checked={g["grant_level"] == 5}
												on:click={(e) =>
													change_grant(
														e,
														5,
														g["grant_level"] == 5,
														g["grant_id"],
														g["service"],
													)}
											/>
											<label
												class="text-xs ml-0.5"
												for="write">Escrita</label
											>
										</div>
										<div class="ml-4">
											<input
												id="admin"
												type="checkbox"
												checked={g["grant_level"] == 7}
												on:click={(e) =>
													change_grant(
														e,
														7,
														g["grant_level"] == 7,
														g["grant_id"],
														g["service"],
													)}
											/>
											<label
												class="text-xs ml-0.5"
												for="admin">Gerenciar</label
											>
										</div>
									</div>
								{/each}
							{/if}
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="absolute right-0 bottom-0 w-0 h-0 flex justify-end items-end">
	{#if newUserWindowActive}
		<NewUserForm
			bind:email
			bind:pass
			bind:isAdmin
			close={() => {
				newUserWindowActive = false;
			}}
			create={createNewUser}
		/>
	{/if}
</div>
