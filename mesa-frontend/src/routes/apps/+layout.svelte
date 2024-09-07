<script context="module">
    import { page } from "$app/stores";

    let errActive = false;
    export let throwError = () => {
        errActive = true;
        setTimeout(() => {
            errActive = false;
        }, 1000);
    };
</script>

{#if $page.url.pathname !== "/apps"}
    <a
        href="/apps"
        class=" cursor-pointer top-0 left-0 absolute px-3 pt-1 pb-1.5 bg-neutral-800 rounded mt-2 mx-4 text-neutral-200 flex items-center justify-center text-2xl"
        >&lt;</a
    >
{/if}
<main class="bg-[url('$lib/assets/logo.png')] bg-no-repeat bg-[length:30%] bg-center ">
<slot />
</main>
{#if errActive}
    <div
        class="absolute right-0 bottom-0 w-full h-0 flex justify-end items-end"
    >
        <div
            class=" opacity-70 select-none h-6 w-screen text-red-50 font-semibold text-sm bg-red-600 flex justify-center items-center"
        >
            Ocorreu um erro ao efetuar a requisição
        </div>
    </div>
{/if}
