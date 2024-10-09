<script lang="ts">
  import Input from "../../../../components/Input.svelte";
  import * as Table from "$lib/components/ui/table";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import Icon from "@iconify/svelte";
  import { Target } from "svelte-radix";
  export let data;

  let ingredients = data.ingredients;
  let search_query = "";
  let editActive = false;
  let isPropsVisible = false;

  let val1 = 0;
  let val2 = 0;
  let qtd1 = 0;
  let qtd2 = 0;
  let editUnit = "un";

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
    isPropsVisible = !isPropsVisible;
  }

  function changeValue(
    newVal: number,
    valIndex: number | undefined = undefined,
    typeOfVal: string
  ): void {
    if (valIndex !== undefined) {
      switch (editUnit) {
        case "l":
          if (valIndex === 0) {
            if (typeOfVal == "qtd") {
              qtd1 = newVal;
              qtd2 = qtd1 * 1000;
            } else {
              val1 = newVal;
              val2 = val1 / 1000;
            }
          } else if (valIndex === 1) {
            if (typeOfVal == "qtd") {
              qtd2 = newVal;
              qtd1 = qtd2 / 1000; // ml to L
            } else {
              val2 = newVal;
              val1 = val2 * 1000;
            }
          }
          break;

        case "kg":
          if (valIndex === 0) {
            if (typeOfVal == "qtd") {
              qtd1 = newVal;
              qtd2 = qtd1 * 1000; // kg to g
            } else {
              val1 = newVal;
              val2 = val1 / 1000;
            }
          } else if (valIndex === 1) {
            if (typeOfVal == "qtd") {
              qtd2 = newVal;
              qtd1 = qtd2 / 1000; // g to kg
            } else {
              val2 = newVal;
              val1 = val2 * 1000;
            }
          }
          break;

        default:
          console.log("Invalid unit for conversion");
      }
    } else {
      // Para unidades 'un', apenas atualiza val1 ou qtd1
      if (typeOfVal === "val") {
        val1 = newVal;
      } else if (typeOfVal === "qtd") {
        qtd1 = newVal;
      }
    }
  }
</script>

<div>
  <div class="flex flex-col w-full">
    <label for="search" class="text-sm font-semibold">Buscar</label>
    <input
      autocomplete="off"
      class="px-2 py-1 rounded mb-4 border"
      id="search"
      bind:value={search_query}
      placeholder="Buscar insumo..."
    />
  </div>
  <Table.Root>
    <Table.Row class="select-none">
      <Table.Head>Insumo</Table.Head>
      <Table.Head>Valor | Unidade</Table.Head>
      <Table.Head>É composto?</Table.Head>
    </Table.Row>
    <Table.Body>
      {#each ingredients as i}
        {#if search_query.trim() == "" || i.name
            .toLowerCase()
            .includes(search_query.trim().toLowerCase())}
          <Table.Row
            class="cursor-pointer"
            on:click={() => openIngredientWindow(i)}
          >
            <Table.Cell>{capitalize(i.name)} ({capitalize(i.unit)})</Table.Cell>
            <Table.Cell>
              {#if typeof i.value === "object"}
                {#each Object.keys(i.value) as key}
                  <div class="flex select-none">
                    <p class="font-mono w-16">
                      R${Number(i.value[key]).toFixed(2)}
                    </p>
                    <p>({capitalize(key)})</p>
                  </div>
                {/each}
              {:else}
                <p class="font-mono">
                  R${Number(i.value).toFixed(2)} ({capitalize(i.unit)})
                </p>
              {/if}
            </Table.Cell>
            {#if i.children_ingredients}
              <Table.Cell>
                <p
                  class="select-none w-20 text-center text-xs p-2 bg-yellow-400 text-yellow-900 rounded-full"
                >
                  Composição
                </p>
              </Table.Cell>
            {:else}
              <Table.Cell>
                <p
                  class="select-none w-20 text-center text-xs p-2 border border-neutral-300 text-neutral-300 rounded-full"
                >
                  Singular
                </p>
              </Table.Cell>
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
              ? Object.entries(selected_ingredient.value)
                  .map(
                    ([key, val]) =>
                      ` R$${Number(val).toFixed(2)} ${capitalize(key)} `
                  )
                  .join(" | ")
              : `R$${Number(selected_ingredient.value).toFixed(2)} (${capitalize(selected_ingredient.unit)})`}
          </p>
        </div>
        <div class="border-t flex flex-col p-4">
          {#if selected_ingredient.children_ingredients && selected_ingredient.children_ingredients.length > 0}
            <div class="w-full">
              <h4 class="font-semibold text-lg">Composição:</h4>
              <ul class="list-disc pl-4 mt-2 border border-neutral-200 rounded">
                <div class="h-96 overflow-y-scroll">
                  {#each selected_ingredient.children_ingredients as child}
                    <li class="flex items-center justify-between">
                      <div class="mt-1">
                        <p>
                          {capitalize(child.data.name)} ({child.qtd}
                          {capitalize(child.target_unit)})
                        </p>
                        <p class="font-bold">
                          R${Number(child.value).toFixed(2)}
                        </p>
                      </div>
                      <div class="flex items-center p-2">
                        <button
                          class="h-8 w-8 hover:opacity-90 rounded bg-neutral-900 text-neutral-50"
                        >
                          <Icon
                            class="w-full text-center text-xl"
                            icon="heroicons-outline:pencil-alt"
                          />
                        </button>
                        <button
                          class="h-8 w-8 hover:opacity-90 rounded bg-red-500 text-red-50 ml-2"
                        >
                          <Icon
                            class="w-full text-center text-xl"
                            icon="ph:trash-bold"
                          />
                        </button>
                      </div>
                    </li>
                  {/each}
                </div>
              </ul>
            </div>
          {:else}
            {#if isPropsVisible}
              <div class="flex flex-col">
                <select
                  class="w-32 text-lg border mb-4"
                  bind:value={editUnit}
                  name="units"
                  id="units"
                >
                  <option value="l">L / ml</option>
                  <option value="kg">Kg / g</option>
                  <option value="un">Un</option>
                </select>
                <div>
                  {#if editUnit === "l"}
                    <p class="font-semibold">Litro (L)</p>
                    <br />
                    <div class="border-b pb-2">
                      <label for="val1-l" class="font-semibold">Valor (L)</label
                      >
                      <input
                        id="val1-l"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 0, "val")}
                        class="py-1 px-2 border rounded"
                        bind:value={val1}
                        placeholder="Valor (L)"
                        type="number"
                        min="0"
                      />
                      <br />
                      <label for="qtd1-l" class="font-semibold"
                        >Quantidade (L)</label
                      >
                      <input
                        id="qtd1-l"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 0, "qtd")}
                        class="py-1 px-2 border rounded mt-2"
                        bind:value={qtd1}
                        placeholder="Quantidade (L)"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div class="mt-2 mb-4">
                      <p class="font-semibold">Mililitro (ml)</p>
                      <br />
                      <label for="val2-ml" class="font-semibold"
                        >Valor (ml)</label
                      >
                      <input
                        id="val2-ml"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 1, "val")}
                        class="py-1 px-2 border rounded"
                        bind:value={val2}
                        placeholder="Valor (ml)"
                        type="number"
                        min="0"
                      />
                      <br />
                      <label for="qtd2-ml" class="font-semibold"
                        >Quantidade (ml)</label
                      >
                      <input
                        id="qtd2-ml"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 1, "qtd")}
                        class="py-1 px-2 border rounded mt-2"
                        bind:value={qtd2}
                        placeholder="Quantidade (ml)"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div class="p-2">
                      {#if val1 && qtd1}
                        <p class="text-lg">
                          O valor de <span class="font-semibold">{qtd1}</span> L
                          de
                          <span class="font-semibold">
                            {capitalize(selected_ingredient.name)}
                          </span>
                          é
                          <span class="font-semibold">
                            R${val1.toFixed(2)}
                          </span>, e o valor de cada ml é de
                          <span class="font-semibold">
                            R${val2.toFixed(2)}
                          </span>
                        </p>
                      {/if}
                    </div>
                  {/if}

                  {#if editUnit === "kg"}
                    <p class="font-semibold">Quilo (Kg)</p>
                    <br />
                    <div class="border-b pb-2">
                      <label for="val1-kg" class="font-semibold"
                        >Valor (Kg)</label
                      >
                      <input
                        id="val1-kg"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 0, "val")}
                        class="py-1 px-2 border rounded"
                        bind:value={val1}
                        placeholder="Valor (Kg)"
                        type="number"
                        min="0"
                      />
                      <br />
                      <label for="qtd1-kg" class="font-semibold"
                        >Quantidade (Kg)</label
                      >
                      <input
                        id="qtd1-kg"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 0, "qtd")}
                        class="py-1 px-2 border rounded mt-2"
                        bind:value={qtd1}
                        placeholder="Quantidade (Kg)"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div class="mt-2 mb-4">
                      <p class="font-semibold">Grama (g)</p>
                      <br />
                      <label for="val2-g" class="font-semibold">Valor (g)</label
                      >
                      <input
                        id="val2-g"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 1, "val")}
                        class="py-1 px-2 border rounded"
                        bind:value={val2}
                        placeholder="Valor (g)"
                        type="number"
                        min="0"
                      />
                      <br />
                      <label for="qtd2-g" class="font-semibold"
                        >Quantidade (g)</label
                      >
                      <input
                        id="qtd2-g"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), 1, "qtd")}
                        class="py-1 px-2 border rounded mt-2"
                        bind:value={qtd2}
                        placeholder="Quantidade (g)"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div class="p-2">
                      {#if val1 && qtd1}
                        <p class="text-lg">
                          O valor de <span class="font-semibold">{qtd1}</span>
                          Kg de
                          <span class="font-semibold">
                            {capitalize(selected_ingredient.name)}
                          </span>
                          é
                          <span class="font-semibold">
                            R${val1.toFixed(2)}
                          </span>, e o valor de cada g é de
                          <span class="font-semibold">
                            R${val2.toFixed(2)}
                          </span>
                        </p>
                      {/if}
                    </div>
                  {/if}

                  {#if editUnit === "un"}
                    <div class="mt-2 mb-4">
                      <p class="font-semibold">Unidade (un)</p>
                      <br />
                      <label for="val1-un" class="font-semibold"
                        >Valor (un)</label
                      >
                      <input
                        id="val1-un"
                        on:input={(e) =>
                          changeValue(Number(e.target.value), undefined, "val")}
                        class="py-1 px-2 border rounded"
                        bind:value={val1}
                        placeholder="Valor (un)"
                        type="number"
                        min="0"
                      />
                    </div>
                    {#if val1 && qtd1}
                      <p class="text-lg">
                        O valor de cada
                        unidades de
                        <span class="font-semibold">
                          {capitalize(selected_ingredient.name)}
                        </span>
                        é
                        <span class="font-semibold">
                          R${val1.toFixed(2)}
                        </span>
                      </p>
                    {/if}
                  {/if}
                </div>
              </div>
            {/if}
            <div class="gap-4 flex mt-4">
              <Button
                class="bg-yellow-500 hover:bg-yellow-50 border border-yellow-500 hover:text-yellow-500 text-yellow-900"
                variant="default"
              >
                Adicionar composição
              </Button>
              <Button
                class={`${isPropsVisible ? "bg-green-50 text-green-500" : "bg-green-500 text-green-900"} hover:bg-green-50 border border-green-500 hover:text-green-500`}
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
