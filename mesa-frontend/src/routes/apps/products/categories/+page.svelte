<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import Icon from "@iconify/svelte";
  import Input from "../../../../components/Input.svelte";
  import { ProductsService } from "../../../../services/auth/productsService";
  import { ServiceRequest } from "../../../../services/serviceRequest";
  import { handleResponse } from "../../../../services/handleResponse";
  import { getContext } from "svelte";

  const { throwError, showSuccess } = getContext("notify");

  export let data;
  let categories = data.categories;
  let confirmActive = false;

  let selected_category_name = "";
  let selected_category_id = "";
  let edit_name = "";
  let edit_default_cfop = "";
  let edit_default_ncm = "";
  let edit_is_composed = false;
  let edit_max_compose_size = 1;

  function increment() {
    if (edit_max_compose_size < 8) {
      edit_max_compose_size += 1;
    }
  }

  function decrement() {
    if (edit_max_compose_size > 1) {
      edit_max_compose_size -= 1;
    }
  }

  const viewCategory = (category: any) => {
    selected_category_name = category.name;
    edit_default_cfop = category.default_cfop;
    edit_default_ncm = category.default_ncm;
    edit_is_composed = category.is_composed;
    edit_max_compose_size = category.max_compose_size;
    edit_name = category.name;
    selected_category_id = category.id;
    confirmActive = true;
  };

  const removeCategory = async (id: string) => {
    let result = await ServiceRequest.call(() =>
      ProductsService.removeCategory(id)
    );
    handleResponse(result, throwError);
    if (!result.err) {
      categories = await ProductsService.findCategories();
    }
  };

  const createCategory = async () => {
    let name = prompt("Insira o nome da nova categoria", "");
    if (name) {
      let result = await ServiceRequest.call(() =>
        ProductsService.createCategory(name as string)
      );
      handleResponse(result, throwError);
      if (!result.err) {
        categories = await ProductsService.findCategories();
      }
    }
  };

  const editCategory = async () => {
    console.log(selected_category_name != edit_name);

    console.log(edit_is_composed)

    let result = await ServiceRequest.call(() =>
      ProductsService.editCategory(
        selected_category_id,
        edit_name,
        edit_default_cfop,
        edit_default_ncm,
        edit_is_composed,
        edit_max_compose_size
      )
    );
    handleResponse(result, throwError);
    if (!result.err) {
      categories = await ProductsService.findCategories();
    }
  };
</script>

<div>
  <AlertDialog.Root bind:open={confirmActive}>
    <AlertDialog.Trigger></AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Categoria</AlertDialog.Title>
        <AlertDialog.Description>
          <Input
            id="category"
            is_mandatory={true}
            label="Nome da categoria"
            bind:val={edit_name}
          />
          <Input
            id="default_ncm"
            maxlen={10}
            label="NCM padrão (xxxx.xx.xx)"
            bind:val={edit_default_ncm}
          />
          <Input
            id="default_cfop"
            maxlen={4}
            label="CFOP padrão (xxxx)"
            bind:val={edit_default_cfop}
          />
          <div class="flex mb-6">
            <input checked={edit_is_composed} bind:value={edit_is_composed} type="checkbox" />
            <p class="ml-2 select-none">
              Produto composto (permite meio-a-meio)
            </p>
          </div>
          {#if edit_is_composed}
            <div class="p-4 border-t">
              <p class="ml-4 select-none">Máximo número de metades</p>
              <div
                class="flex mt-2 ml-4 items-center justify-evenly bg-neutral-200 rounded-full w-32"
              >
                <button class="mb-1 text-2xl" on:click={decrement}>-</button>
                <div class="text-xl font-semibold">{edit_max_compose_size}</div>
                <button class="mb-1 text-2xl" on:click={increment}>+</button>
              </div>
            </div>
          {/if}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel on:click={editCategory}>Salvar</AlertDialog.Cancel>
        <AlertDialog.Action
          class="hover:bg-red-500 hover:text-white text-red-500 bg-transparent border border-red-500"
          on:click={() => removeCategory(selected_category_id)}
          >Remover</AlertDialog.Action
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>

  <div class=" flex justify-between">
    <div class="mb-4">
      <h2 class=" pb-2 text-2xl font-semibold tracking-tight transition-colors">
        Categorias
      </h2>
      <p class=" select-none text-xs text-left text-neutral-600">
        Crie ou edite categorias para seus produtos.
      </p>
    </div>
    <Button on:click={createCategory}
      ><Icon class="text-lg mr-1 mt-0.5" icon="material-symbols:add" />Nova
      categoria</Button
    >
  </div>
  <div class="flex gap-2 flex-wrap">
    {#each categories as c}
      <button
        on:click={() => viewCategory(c)}
        class=" h-min hover:scale-110 transition-all w-min shadow-sm select-none cursor-pointer border rounded py-2 px-4 font-semibold"
      >
        {c.name}
      </button>
    {/each}
  </div>
</div>
