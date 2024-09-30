<script lang="ts">
  import { getContext, onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Icon from "@iconify/svelte";
  import DataTable from "./dataTable.svelte";
  import { ProductsService } from "../../../../services/auth/productsService";
  import { handleResponse } from "../../../../services/handleResponse";
  import { ServiceRequest } from "../../../../services/serviceRequest";
  import type INewProduct from "../../../../services/auth/INewProduct";
  import type { IEditProduct } from "../../../../services/auth/INewProduct";
  import NewProductForm from "./components/NewProductForm.svelte";

  const { throwError, showSuccess } = getContext("notify");

  // exports
  export let data;
  let products_pagination = data.products_pagination;
  let categories = data.categories;

  console.log(categories);

  // paginacao
  let actualPage = 1;
  let actualLimit = 2;
  let productsCount = data.products_pagination.total;
  let lastPageIndex = data.products_pagination.pages;

  let searchQuery = "";

  // Active windows state
  let windows = {
    novaProduto: {
      minimized: false,
      closed: true,
    },
    editaProduto: {
      minimized: false,
      closed: true,
    },
  };

  // Form data
  let name: string = "";
  let description: string = "";
  let search_code: number;
  let category_id: string = "";
  let NCM: string = "";
  let CFOP: string = "";
  let vProd: number;

  // Form data edit
  let edit_product_id = "";
  let edit_name: string = "";
  let edit_description: string = "";
  let edit_search_code = 0;
  let edit_category_id: string = "";
  let edit_NCM: string = "";
  let edit_CFOP: string = "";
  let edit_vProd = 0;

  const getCategoryDefaultInfoCreate = () => {
    for (let c of categories) {
      if (c.id == category_id) {
        NCM = c.default_ncm;
        CFOP = c.default_cfop;
      }
    }
  };

  const getCategoryDefaultInfoEdit = () => {
    for (let c of categories) {
      if (c.id == edit_category_id) {
        edit_NCM = c.default_ncm;
        edit_CFOP = c.default_cfop;
      }
    }
  };

  const refreshproducts = async (refreshWindow: string | null | undefined) => {
    let reqproducts = await ServiceRequest.call(() =>
      ProductsService.findProducts(actualLimit, actualPage, searchQuery)
    );
    handleResponse(reqproducts, throwError);
    if (refreshWindow) closeWindow(refreshWindow);
    products_pagination = reqproducts.result;
    productsCount = products_pagination.total;
    lastPageIndex = products_pagination.pages;

    if (actualPage > lastPageIndex) {
      actualPage = lastPageIndex;
      refreshproducts(null);
    }
  };

  const createproduct = async () => {
    const productData: INewProduct = {
      name: name,
      description: description,
      search_code: search_code,
      category_id: category_id,
      NCM: NCM,
      CFOP: CFOP,
      vProd: vProd,
    };

    let reqCreateproduct = await ServiceRequest.call(() =>
      ProductsService.createNewProduct(productData)
    );
    let errCreateproduct = handleResponse(reqCreateproduct, throwError);
    if (!errCreateproduct) {
      refreshproducts("novaProduto");
    }
  };

  const editproduct = async () => {
    const productData: IEditProduct = {
      product_id: edit_product_id,
      name: edit_name,
      description: edit_description,
      search_code: edit_search_code,
      category_id: edit_category_id,
      NCM: edit_NCM,
      CFOP: edit_CFOP,
      vProd: edit_vProd,
    };

    let result = await ServiceRequest.call(() =>
      ProductsService.editProduct(productData)
    );
    let err = handleResponse(result, throwError);
    if (!err) {
      refreshproducts("editaProduto");
    }
  };

  const deleteproduct = async () => {
    let result = await ServiceRequest.call(() =>
      ProductsService.removeProduct(edit_product_id)
    );
    let err = handleResponse(result, throwError);
    if (!err) {
      refreshproducts("editaProduto");
    }
  };

  const editproductModalActive = (p: any) => {
    let product = p["original"];
    windows["editaProduto"].closed = false;
    edit_product_id = product.id;
    edit_name = product.name;
    edit_description = product.description;
    edit_search_code = product.search_code;
    edit_category_id = product.category_id;
    edit_NCM = product.fisco.ncm;
    edit_CFOP = product.fisco.cfop;
    edit_vProd = product.fisco.v_prod;
  };

  const closeWindow = (windowName: string) => {
    if (windowName == "novaProduto") {
      name = "";
      description = "";
      search_code = 0;
      category_id = "";
      NCM = "";
      CFOP = "";
      vProd = 0;
      windows["novaProduto"].closed = true;
    }

    if (windowName == "editaProduto") {
      edit_product_id = "";
      edit_name = "";
      edit_description = "";
      edit_search_code = 0;
      edit_category_id = "";
      edit_NCM = "";
      edit_CFOP = "";
      edit_vProd = 0;
      windows["editaProduto"].closed = true;
    }
  };
</script>

<div>
  <div class=" w-full flex justify-between items-center">
    <div class="mb-4">
      <h2 class=" pb-2 text-2xl font-semibold tracking-tight transition-colors">
        Produtos cadastrados
      </h2>
      <p class=" select-none text-xs text-left text-neutral-600">
        Crie produtos. Clique nas tabelas para visualizar individualmente e
        editar.
      </p>
    </div>
    <div>
      <Button
        on:click={() => {
          windows["novaProduto"].closed = false;
          windows["novaProduto"].minimized = false;
        }}
      >
        <Icon class="text-lg mr-1 mt-0.5" icon="material-symbols:add" />
        Novo produto
      </Button>
    </div>
  </div>
  <div class="w-full border-t pt-6 flex flex-wrap gap-4">
    <div class="rounded-md border w-full">
      {#if products_pagination}
        <DataTable
          {editproductModalActive}
          products={products_pagination.products}
          {categories}
          bind:actualPage
          bind:lastPageIndex
          bind:actualLimit
          bind:searchQuery
          refreshFunction={() => refreshproducts(null)}
        />
        <div
          class="p-2 border-t rounded-full w-full select-none flex flex-col items-center justify-center"
        >
          <p>Página {actualPage} de {lastPageIndex}</p>
          <p class="text-xs text-neutral-600">
            {productsCount} produtos encontrados
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>

<div class="absolute right-0 bottom-0 w-0 h-0 flex justify-end items-end">
  {#if windows["novaProduto"].minimized && !windows["novaProduto"].closed}
    <div
      on:click={() => (windows["novaProduto"].minimized = false)}
      class=" relative z-20 p-2 h-32 w-16 bg-neutral-50 border-neutral-400 border rounded-t shadow-2xl"
    >
      <p class="select-none text-xs font-thin">Novo cadastro</p>
    </div>
  {/if}

  {#if windows["editaProduto"].minimized && !windows["editaProduto"].closed}
    <div
      on:click={() => (windows["editaProduto"].minimized = false)}
      class="relative z-20 p-2 h-32 w-16 bg-neutral-50 border-neutral-400 border rounded-t shadow-2xl"
    >
      <p class="select-none text-xs font-thin">Editar cadastro</p>
    </div>
  {/if}

  {#if !windows["novaProduto"].minimized && !windows["novaProduto"].closed}
    <NewProductForm
      bind:name
      bind:description
      bind:search_code
      bind:category_id
      bind:NCM
      bind:CFOP
      bind:vProd
      {categories}
      onChangeCategory={getCategoryDefaultInfoCreate}
      minimize={() => (windows["novaProduto"].minimized = true)}
      close={() => closeWindow("novaProduto")}
      type="create"
      create={createproduct}
      deletes={deleteproduct}
    />
  {/if}

  {#if !windows["editaProduto"].minimized && !windows["editaProduto"].closed}
    <NewProductForm
      bind:name={edit_name}
      bind:description={edit_description}
      bind:search_code={edit_search_code}
      bind:category_id={edit_category_id}
      bind:NCM={edit_NCM}
      bind:CFOP={edit_CFOP}
      bind:vProd={edit_vProd}
      onChangeCategory={getCategoryDefaultInfoEdit}
      {categories}
      minimize={() => (windows["editaProduto"].minimized = true)}
      close={() => closeWindow("editaProduto")}
      type="update"
      create={editproduct}
      deletes={deleteproduct}
    />
  {/if}
</div>
