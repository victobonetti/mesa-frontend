<script lang="ts" context="module">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";

    let back_path = "/apps"

    // Função para obter o href (removendo a última parte da URL)
    const getHref = (path: string) => {
        console.log(path)
        const pathname =  window.location.pathname.split('/');
        back_path = pathname.slice(0, pathname.length - 1).join('/');
        goto(back_path)
    };

</script>

<header class="bg-white w-screen border-b h-12 fixed top-0 pl-12 flex items-center">
    {#if $page.url.pathname !== "/apps"}
        <Button on:click={getHref($page.url.pathname)} variant="outline" size="icon">
            <Icon class="text-lg" icon="ion:chevron-back" />
        </Button>
    {/if}
</header>

<main class="bg-center px-12 pb-12 pt-16 h-screen w-screen">
    <slot />
</main>
