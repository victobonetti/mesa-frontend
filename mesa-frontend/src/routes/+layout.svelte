<script>
  import { setContext } from "svelte";
  import "../app.css";
  import Icon from "@iconify/svelte";
  import * as Alert from "$lib/components/ui/alert";

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

{#if errActive || successActive}
  <div class="absolute bottom-0 z-50 select-none flex flex-col p-2">
    {#if errActive}
      <Alert.Root variant="destructive" class="bg-white m-2 flex ">
        <div class="mr-4">
          <Icon
            class="text-3xl"
            icon="material-symbols:error-outline-rounded"
          />
        </div>
        <div>
          <Alert.Title>Oops!</Alert.Title>
          <Alert.Description>
            {errMessage}
          </Alert.Description>
        </div>
      </Alert.Root>
    {/if}
    {#if successActive}
      <Alert.Root variant="default" class=" bg-white m-2 flex">
        <div class="mr-4">
          <Icon class="text-3xl" icon="mdi:success-circle-outline" />
        </div>
        <div>
          <Alert.Title>Sucesso!</Alert.Title>
          <Alert.Description>
            {successMsg}
          </Alert.Description>
        </div>
      </Alert.Root>
    {/if}
  </div>
{/if}

<main
  class=" text-neutral-900 h-screen w-screen flex justify-center items-center"
>
  <slot />
</main>
