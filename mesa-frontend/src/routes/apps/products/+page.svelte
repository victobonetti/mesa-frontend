<script lang="ts">
  export let data;
  import { goto } from "$app/navigation";
  import Icon from "@iconify/svelte";

  const routes = [
    [
      "Produtos",
      "products-registry",
      "uil:food",
    ],
    [
      "Insumos",
      "ingredients-registry",
      "fluent:food-carrot-24-regular",
    ],
    [
      "Ficha técnica",
      "ficha-tecnica",
      "raphael:paper",
    ],
    [
      "Categorias",
      "categories",
      "material-symbols:category-outline-rounded",
    ],
  ];

  function handleCardClick(route: string) {
    goto(`/apps/products/${route}`);
  }
</script>

<div>
  <div class="mb-4">
    <h2 class="pb-2 text-2xl font-semibold tracking-tight transition-colors">
      Produtos e Insumos
    </h2>
    <p class="select-none text-xs text-left text-neutral-600">
      Crie produtos. Obtenha ficha técnica para produtos e insumos.
    </p>
  </div>

  <div class="w-full border-t pt-6 p-2 flex gap-6">
    {#each routes as [title, route, icon]}
      <div on:click={() => handleCardClick(route)} class=" shadow cursor-pointer hover:border-black h-32 border flex items-center p-4 rounded-xl">
        <div class="select-none cursor-pointer ">
          <p class="w-32 text-2xl ">{title}</p>
        </div>
        <Icon class="text-5xl" {icon} />
      </div>
    {/each}
  </div>
</div>
