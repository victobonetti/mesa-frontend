<script>
  import { setContext } from "svelte";
  import "../app.css";
  let errActive = false;
  let errMessage = "";
  let successActive = false;
  let successMsg = "";

  export let throwError = (
    message = "Ocorreu um erro ao efetuar a requisição. Tente novamente.",
  ) => {
    errMessage = message;
    errActive = true;
    setTimeout(() => {
      errActive = false;
    }, 4000);
  };

  export let showSuccess = (message = "Ação concluída com sucesso.") => {
    successMsg = message;
    successActive = true;
    setTimeout(() => {
      successActive = false;
    }, 4000);
  };

  setContext("notify", { throwError, showSuccess });
</script>

<main
  class=" bg-neutral-50 text-neutral-900 h-screen w-screen flex justify-center items-center"
>
  <slot />
</main>

{#if errActive || successActive}
  <div class="absolute right-0 bottom-0 w-full h-0 flex justify-end items-end">
    {#if errActive}
      <div
        class=" z-50 animate-pulse opacity-70 select-none h-8 w-screen text-red-50 font-semibold bg-red-600 flex justify-center items-center"
      >
        {errMessage}
      </div>
    {/if}
    {#if successActive}
      <div
        class=" z-50 animate-pulse opacity-70 select-none h-8 w-screen text-green-50 font-semibold bg-green-600 flex justify-center items-center"
      >
        {successMsg}
      </div>
    {/if}
  </div>
{/if}
