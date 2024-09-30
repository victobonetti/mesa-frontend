<script>
  // @ts-nocheck
  import Input from "../../../../../components/Input.svelte";
  import { getContext } from "svelte";
  export let name;
  export let description;
  export let search_code;
  export let category_id;
  export let NCM;
  export let CFOP;
  export let vProd;

  export let categories;

  export let type = "";
  export let minimize;
  export let close;
  export let create;
  export let deletes;
  export let onChangeCategory;

  const { showConfirm } = getContext("notify");

  const triggerDeletes = () => {
    showConfirm(
      "Essa ação irá excluir a pessoa `" + name + "` permanentemente.",
      () => deletes()
    );
  };
</script>

<div
  class="relative z-20 bg-neutral-50 border-neutral-400 border rounded-tl shadow-2xl"
>
  <div class="p-4 min-w-md mx-auto">
    <div
      class="border-b border-neutral-300 pb-1 mb-2 w-full flex justify-between items-center"
    >
      {#if type == "create"}
        <h1 class="w-1/2 select-none text-neutral-600 min-w-96">
          Novo cadastro
        </h1>
      {/if}
      {#if type == "update"}
        <h1 class="w-1/2 select-none text-neutral-600 min-w-96">
          Edição de cadastro
        </h1>
      {/if}
      <div class=" flex w-1/2 items-center justify-center font-thin">
        <p
          on:click={minimize}
          class="cursor-pointer hover:text-blue-800 mr-4 text-4xl"
        >
          -
        </p>
        <p on:click={close} class="cursor-pointer hover:text-rose-800 text-2xl">
          x
        </p>
      </div>
    </div>

    <Input
      id="name"
      is_mandatory={true}
      label="Nome do produto"
      bind:val={name}
      minlen={4}
    />
    <Input
      id="description"
      label="Descrição do produto"
      bind:val={description}
    />
    <Input
      id="search_code"
      type={"number"}
      label="Código de busca"
      bind:val={search_code}
      maxlen={9999}
    />
    <label for="category" class="flex text-xs font-medium text-neutral-700"
      >Categoria

      <p class="text-red-500">*</p>
    </label>
    <select
      class="text-xs py-1 text-neutral-600 mb-3 w-full border rounded border-neutral-300"
      bind:value={category_id}
      on:change={onChangeCategory}
      name="category"
      id="category"
      maxlen={9999}
    >
      {#each categories as c}
        <option value={c.id}>{c.name}</option>
      {/each}
    </select>
    <Input
      id="vProd"
      is_mandatory={true}
      label="Preço do produto"
      type={"number"}
      maxlen={6}
      bind:val={vProd}
    />
    <h1 class="w-1/2 mb-2 border-b select-none font-thin text-neutral-500 min-w-96">
      Fiscal
    </h1>
    <Input id="NCM" label="NCM (xxxx.xx.xx)" is_mandatory={true} bind:val={NCM} />
    <Input id="CFOP" label="CFOP" maxlen={4} is_mandatory={true} bind:val={CFOP} />
  </div>
  <div class="w-full flex justify-end pr-4">
    {#if type == "create"}
      <button
        on:click={create}
        class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-green-400 text-green-900"
        >Criar</button
      >
    {/if}

    {#if type == "update"}
      <button
        on:click={triggerDeletes}
        class=" mr-2 mb-3 rounded text-sm py-2 px-4 border border-red-400 shadow-inner bg-transparent text-red-400"
        >Excluir</button
      >
      <button
        on:click={create}
        class=" mb-3 rounded text-sm py-2 px-4 border-green-200 shadow-inner bg-yellow-400 text-yellow-900"
        >Editar</button
      >
    {/if}
  </div>
</div>
