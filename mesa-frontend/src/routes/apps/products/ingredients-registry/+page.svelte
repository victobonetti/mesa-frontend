<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import * as Table from "$lib/components/ui/table";
  export let data;
  
  let ingredients = data.ingredients;
  let search_query = ""
</script>

<div>
  <label for="search" class="text-sm font-semibold">Buscar</label>
  <Input class="mb-4" id="search" bind:value={search_query} />
  <Table.Root>
    <Table.Row class="  select-none">
      <Table.Head>Insumo</Table.Head>
      <Table.Head>Valor | Unidade</Table.Head>
      <Table.Head>É composto?</Table.Head>
    </Table.Row>
    <Table.Body>
      {#each ingredients as i}
        {#if search_query.trim() == "" || i.name.includes(search_query.trim()) }
        <Table.Row class="cursor-pointer">
          <Table.Cell>{i.name} ({i.unit})</Table.Cell>
          <Table.Cell>
            {#each Object.keys(i.value) as key}
              <div class="flex select-none">
                <p class=" font-mono w-16">R${i.value[key].toFixed(2)}</p>
                <p>({key.toUpperCase()})</p>
              </div>
            {/each}
          </Table.Cell>
          {#if i.children_ingredients}
            <Table.Cell>
              <p
                class=" select-none w-20 text-center text-xs p-2 bg-yellow-400 text-yellow-900 rounded-full"
              >
                Composição
              </p></Table.Cell
            >
          {:else}
            <Table.Cell>
              <p
                class=" select-none w-20 text-center text-xs p-2 bg-neutral-400 text-neutral-50 rounded-full"
              >
                Singular
              </p></Table.Cell
            >
          {/if}
        </Table.Row>
        {/if}
      {/each}
    </Table.Body>
  </Table.Root>
</div>
<!-- 
   {#each i.children_ingredients as c}
                <p class="font-bold">{c.data.name}</p>
                <div class="p-2">
                  <p class="text-sm font-mono">Unidades: {c.qtd}</p>
                  <p class="text-sm font-mono">Medidas: {c.target_unit}</p>
                  <p class="text-sm font-mono">Total: R${c.value.toFixed(2)}</p> 
                   -->
