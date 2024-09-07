<script>
  import { setContext } from "svelte";
  import "../app.css";
  let errActive = false;
  export let throwError = () => {
    errActive = true;
    setTimeout(() => {
      errActive = false;
    }, 4000);
  };
  setContext('notify', { throwError })
</script>

<main
  class=" bg-neutral-50 text-neutral-900 h-screen w-screen flex justify-center items-center"
>
  <slot />
</main>


{#if errActive}
    <div
        class="absolute right-0 bottom-0 w-full h-0 flex justify-end items-end"
    >
        <div
            class=" animate-pulse opacity-70 select-none h-8 w-screen text-red-50 font-semibold bg-red-600 flex justify-center items-center"
        >
            Ocorreu um erro ao efetuar a requisição. Tente novamente.
        </div>
    </div>
{/if}