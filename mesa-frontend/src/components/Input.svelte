<script lang="ts">
    export let val: string;
    export let id: string;
    export let label: string;

</script>

<div class="mb-4">
    <label for={id} class="block text-xs font-medium text-neutral-700"
        >{label}</label
    >
    <input
        type="text"
        {id}
        bind:value={val}
        class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
    />
</div>
