<script context="module">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import Icon from "@iconify/svelte";
</script>

<header class="w-screen border-b h-12 fixed top-0 pl-12 flex items-center">
    {#if $page.url.pathname !== "/apps"}
        <Button variant="outline" size="icon" href="/apps">
            <Icon class="text-lg" icon="ion:chevron-back"
        />
        </Button>
    {/if}
</header>
<main
    class="bg-center px-12 pb-12 pt-16 h-screen w-screen"
>
    <slot />
</main>
