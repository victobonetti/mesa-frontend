<script lang="ts">
	export let data;
	let users = data.users;
	let persons = data.persons;

	const findUserName = (email: string) => {
		let userName = "Usuário sem dados";
		for (let p of persons) {
			if (p["email"] == email) {
				userName = p["full_name"];
			}
		}
		return userName;
	};
</script>

<div class="w-screen h-screen p-12">
	<div class="mb-4">
		<h1 class=" select-none text-2xl mb-2">Usuários do domínio</h1>
		<p class=" select-none text-xs text-left text-neutral-600">
			Gerencie usuários com acesso ao sistema; O email do registro irá
			obter as informações cadastradas no módulo de cadastro de pessoas.
		</p>
	</div>
	<div class=" w-full border-t pt-6 flex-wrap gap-4 flex">
		<div class=" flex flex-col items-center">
			{#each users as u}
				<div class=" p-2 mb-2 border-b pb-2 flex w-96">
					<div class=" w-48">
						<h3 class=" font-medium">{findUserName(u["email"])}</h3>
						<h4 class="ml-0.5 text-sm text-neutral-600">
							{u["email"]}
						</h4>
					</div>
					<div class=" pl-12 flex justify-center items-center">
						<button
							class=" shadow-inner bg-neutral-900 hover:bg-neutral-800 text-neutral-100 rounded-full text-xs w-32 px-4 py-2"
							>Gerenciar permissões</button
						>
					</div>
				</div>
			{/each}
		</div>
		<div
			class=" pt-3 px-4 shadow-sm ml-12 border rounded w-1/2 min-w-96 bg-neutral-50"
		>
			<h2 class=" select-none pb-1 font-semibold border-b">
				Permissões do usuário
			</h2>
			<div class="p-2">
				<div class=" border-b mb-2">
					<h3 class=" text-sm font-light select-none">Super Admin</h3>
					<div class="flex flex-col mb-2 mt-1">
						<div class="flex">
							<input id="read" type="checkbox" />
							<label class="text-xs ml-0.5 flex" for="read"
								>Habilitado
								<p class="text-red-500">*</p></label
							>
						</div>
						<p class="text-red-500 text-xs">
							* Todas as permissões habilitadas
						</p>
					</div>
				</div>
				<div>
					<h3 class=" text-sm font-light select-none">Usuários do domínio</h3>
					<div class="flex mt-1">
						<div>
							<input id="read" type="checkbox" />
							<label class="text-xs ml-0.5" for="read"
								>Leitura</label
							>
						</div>
						<div class="ml-4">
							<input id="write" type="checkbox" />
							<label class="text-xs ml-0.5" for="write"
								>Escrita</label
							>
						</div>
						<div class="ml-4">
							<input id="admin" type="checkbox" />
							<label class="text-xs ml-0.5" for="admin"
								>Admin</label
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
