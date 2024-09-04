<script context="module">
    import { page } from '$app/stores';
</script>

{#if $page.url.pathname !== '/apps'}
<a href="/apps" class=" cursor-pointer top-0 left-0 absolute px-3 pt-1 pb-1.5 bg-neutral-900 rounded mt-2 mx-4 text-neutral-200 flex items-center justify-center text-2xl">&lt;</a> 
{/if}
<slot />
