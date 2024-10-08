<script lang="ts">
  import Input from "../../../../components/Input.svelte";
  import * as Table from "$lib/components/ui/table";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import Icon from "@iconify/svelte";
  export let data;

  let ingredients = data.ingredients;
  let search_query = "";
  let editActive = false;
  let isPropsVisible = false;

  let editVal = "";
  let editQtd = "";

  function capitalize(str: string) {
    if (!str) return "";
    if (str.length == 2) return str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  let selected_ingredient: any = undefined;

  function openIngredientWindow(i: any): void {
    selected_ingredient = i;
    editActive = true;
    isPropsVisible = false;
  }

  function setPropsVisible(): void {
    isPropsVisible = true;
  }
</script>

<div>
  <div class="flex flex-col w-full">
    <label for="search" class="text-sm font-semibold">Buscar</label>
    <input
      autocomplete="disabled"
      class=" px-2 py-1 rounded mb-4 border"
      id="search"
      bind:value={search_query}
    />
  </div>
  <Table.Root>
    <Table.Row class="  select-none">
      <Table.Head>Insumo</Table.Head>
      <Table.Head>Valor | Unidade</Table.Head>
      <Table.Head>É composto?</Table.Head>
    </Table.Row>
    <Table.Body>
      {#each ingredients as i}
        {#if search_query.trim() == "" || i.name.includes(search_query.trim())}
          <Table.Row
            class="cursor-pointer"
            on:click={() => openIngredientWindow(i)}
          >
            <Table.Cell>{capitalize(i.name)} ({capitalize(i.unit)})</Table.Cell>
            <Table.Cell>
              {#each Object.keys(i.value) as key}
                <div class="flex select-none">
                  <p class=" font-mono w-16">R${i.value[key].toFixed(2)}</p>
                  <p>({capitalize(key)})</p>
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
                  class=" select-none w-20 text-center text-xs p-2 border border-neutral-300 text-neutral-300 rounded-full"
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

<AlertDialog.Root bind:open={editActive}>
  <AlertDialog.Trigger></AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Editar insumo</AlertDialog.Title>
      <AlertDialog.Description class="border rounded shadow-sm py-4">
        <div class="flex justify-between px-4">
          <p class="font-semibold text-lg text-neutral-700 mb-4">
            {capitalize(selected_ingredient.name)}
          </p>
          <p class="text-xl">
            {typeof selected_ingredient.value === "object"
              ? Object.entries(selected_ingredient.value).map(
                  ([key, val]) =>
                    ` R$${Number(val).toFixed(2)} ${capitalize(key)} `
                )
              : `R$${Number(selected_ingredient.value).toFixed(2)}`}
          </p>
        </div>
        <div class="border-t flex p-4">
          {#if selected_ingredient.children_ingredients && selected_ingredient.children_ingredients.length > 0}
            <div class="w-full">
              <h4 class="font-semibold text-lg">Composição:</h4>
              <ul class="list-disc pl-4 mt-2 border border-neutral-200 rounded">
                <div class=" h-96 overflow-y-scroll">
                  {#each selected_ingredient.children_ingredients as child}
                    <li class="flex items-center justify-between">
                      <div class=" mt-1">
                        <p>
                          {capitalize(child.data.name)} ({child.qtd}
                          {capitalize(child.target_unit)})
                        </p>
                        <p class="font-bold">R${child.value.toFixed(2)}</p>
                      </div>
                      <div class=" flex items-center p-2">
                        <button
                          class=" h-8 w-8 hover:opacity-90 rounded bg-neutral-900 text-neutral-50"
                          ><Icon
                            class="w-full text-center text-xl"
                            icon="heroicons-outline:pencil-alt"
                          /></button
                        >
                        <button
                          class=" h-8 w-8 hover:opacity-90 rounded bg-red-500 text-red-50 ml-2"
                          ><Icon
                            class="w-full text-center text-xl"
                            icon="ph:trash-bold"
                          /></button
                        >
                      </div>
                    </li>
                  {/each}
                </div>
              </ul>
            </div>
          {:else}
            {#if isPropsVisible}
              <div>
                <select name="units" id="">
                  <option value="l">L / ml</option>
                  <option value="g">Kg / g</option>
                  <option value="un">Unidade</option>
                </select>
                // TODO logica pra variar inputs de acordo com o valor do select
                <Input
                  id={"val"}
                  label={"Valor"}
                  type={"number"}
                  val={editVal}
                />
                <Input
                  id={"qtd"}
                  label={"Quantidade"}
                  type={"number"}
                  val={editQtd}
                />
              </div>
            {/if}
            <div class="gap-4">
              <Button
                class="bg-yellow-500 hover:bg-yellow-50 border border-yellow-500 hover:text-yellow-500 text-yellow-900"
                variant="default"
              >
                Adicionar composição
              </Button>
              <Button
                class="bg-green-500 hover:bg-yellow-50 border border-green-500 hover:text-green-500 text-green-900"
                variant="default"
                on:click={setPropsVisible}
              >
                Editar propriedades
              </Button>
            </div>
          {/if}
        </div>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
      <AlertDialog.Action>Salvar</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<!-- 
   {#each i.children_ingredients as c}
                <p class="font-bold">{c.data.name}</p>
                <div class="p-2">
                  <p class="text-sm font-mono">Unidades: {c.qtd}</p>
                  <p class="text-sm font-mono">Medidas: {c.target_unit}</p>
                  <p class="text-sm font-mono">Total: R${c.value.toFixed(2)}</p> 
                   -->
