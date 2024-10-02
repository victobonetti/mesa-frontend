<script lang="ts">
  export let data;
  let ingredients = data.ingredients;
  console.log(ingredients);
</script>

<div>
  {#each ingredients as i}
    <div
      class="p-4 border-t rounded hover:bg-slate-100 select-none cursor:pointer"
    >
      <p class="text-lg font-semibold mb-2">{i.name} ({i.unit})</p>
      {#each Object.keys(i.value) as key}
        <span class="flex border-l pl-4 mt-2">
          <p class=" font-mono w-24">R${i.value[key].toFixed(2)}</p>
          <p>{key}</p>
        </span>
      {/each}
      {#if i.children_ingredients}
        {#each i.children_ingredients as c}
          <p class=" text-xs p-2 bg-yellow-400 text-yellow-900 w-min rounded-full">
            Composição
          </p>
          <span>
            <div class="p-4 border-b">
              <p class="font-bold">{c.data.name}</p>
              <div class="p-2">
                <p class="text-sm font-mono">Unidades: {c.qtd}</p>
                <p class="text-sm font-mono">Medidas: {c.target_unit}</p>
                <p class="text-sm font-mono">Total: R${c.value.toFixed(2)}</p>
              </div>
            </div>
          </span>
        {/each}
      {/if}
    </div>
  {/each}
</div>
