<script lang="ts">
    export let val: string;
    export let id: string;
    export let label: string;
    export let is_mandatory: boolean = false;
    export let type = "text";
    export let minlen = 0;
    export let maxlen = 24;
</script>

<div class="mb-4">
    <label for={id} class="flex text-xs font-medium text-neutral-700"
        >{label} 
        {#if is_mandatory}
        <p class="text-red-500">*</p>
        {/if}
        </label
    >
    {#if type == "text"}
    <input
        type="text"
        {id}
        bind:value={val}
        minlength={minlen}
        maxlength={maxlen}
        class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
    />
    {/if}

    {#if type == "number"}
    <input
        type=number
        {id}
        bind:value={val}
        minlength={minlen}
        maxlength={maxlen}
        class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-xs"
    />
    {/if}
</div>
