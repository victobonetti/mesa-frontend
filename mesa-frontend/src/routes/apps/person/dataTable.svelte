<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { writable } from "svelte/store";
    import { Label } from "$lib/components/ui/label/index.js";
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import * as Select from "$lib/components/ui/select";
    import {
        addPagination,
        addSortBy,
        addTableFilter,
        addHiddenColumns,
    } from "svelte-headless-table/plugins";
    import { Button } from "$lib/components/ui/button";
    import Icon from "@iconify/svelte";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    export let persons;
    export let editPersonModalActive;
    export let actualPage: number;
    export let lastPageIndex: number;
    export let refreshFunction;
    export let actualLimit: number;
    export let searchQuery: string;

    const limitOptions = [2, 5, 10, 20, 50, 100];

    const nextPage = () => {
        actualPage = actualPage + 1;
        refreshFunction();
    };

    const lastPage = () => {
        actualPage--;
        refreshFunction();
    };

    const tablepersons = writable(persons);
    $: $tablepersons = persons;

    const table = createTable(tablepersons, {
        page: addPagination(),
        sort: addSortBy(),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
        hide: addHiddenColumns(),
    });

    const columns = table.createColumns([
        table.column({
            accessor: (row: any) => row.full_name,
            header: "Nome",
        }),
        table.column({
            accessor: (row: any) => row.cpf,
            header: "CPF",
        }),
        table.column({
            accessor: (row: any) => row.date_of_birth,
            header: "Data Nasc.",
        }),
        table.column({
            accessor: (row: any) => row.email,
            header: "Email",
        }),
        table.column({
            accessor: (row: any) => row.phone,
            header: "Telefone",
        }),
        table.column({
            accessor: (row: any) => row.address?.street,
            header: "Rua",
        }),
        table.column({
            accessor: (row: any) => row.address?.number,
            header: "Número",
        }),
        table.column({
            accessor: (row: any) => row.address?.city,
            header: "Cidade",
        }),
        table.column({
            accessor: (row: any) => row.address?.cep,
            header: "CEP",
        }),
    ]);

    const {
        headerRows,
        pageRows,
        tableAttrs,
        tableBodyAttrs,
        pluginStates,
        flatColumns,
    } = table.createViewModel(columns);

    const { hiddenColumnIds } = pluginStates.hide;

    const ids = flatColumns.map((col) => col.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => !hide)
        .map(([id]) => id);

    const hidableCols = [
        "Email",
        "Data Nasc.",
        "Rua",
        "Número",
        "Cidade",
        "CEP",
        "CPF",
    ];
</script>

<div class="flex items-center py-4">
    <div class="ml-4 w-1/2">
        <div class="flex">
            <Input
                id="search"
                class="max-w-lg"
                placeholder="Filtro de busca"
                type="text"
                bind:value={searchQuery}
            />
            <Button on:click={refreshFunction} variant="outline" class="ml-2 ">
                <Icon class="mt-0.5 mr-2" icon="ion:search" />
                Pesquisar
                </Button
            >
        </div>
    </div>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button variant="outline" class="ml-auto mr-2" builders={[builder]}>
                <Icon class="mr-1 mt-0.5" icon="fa-solid:filter" />
                Colunas visíveis
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            {#each flatColumns as col}
                {#if hidableCols.includes(col.id)}
                    <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                        {col.header}
                    </DropdownMenu.CheckboxItem>
                {/if}
            {/each}
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>

<Table.Root class="text-xs w-full" {...$tableAttrs}>
    <Table.Header>
        {#if $headerRows}
            {#each $headerRows as headerRow}
                <Subscribe rowAttrs={headerRow.attrs()}>
                    <Table.Row>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe
                                attrs={cell.attrs()}
                                let:attrs
                                props={cell.props()}
                                let:props
                            >
                                <Table.Head {...attrs}>
                                    {#if cell.id == "Nome" || cell.id == "Email"}
                                        <Button
                                            variant="ghost"
                                            on:click={props.sort.toggle}
                                        >
                                            <Render of={cell.render()} />
                                            <Icon
                                                class="ml-1 mt-0.5"
                                                icon="entypo:select-arrows"
                                            />
                                        </Button>
                                    {:else}
                                        <Render of={cell.render()} />
                                    {/if}
                                </Table.Head>
                            </Subscribe>
                        {/each}
                    </Table.Row>
                </Subscribe>
            {/each}
        {/if}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
        {#if $pageRows}
            {#each $pageRows as row (row.id)}
                <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                    <Table.Row
                        on:click={() => editPersonModalActive(row)}
                        class="cursor-pointer"
                        {...rowAttrs}
                    >
                        {#each row.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <Table.Cell {...attrs}>
                                    <Render of={cell.render()} />
                                </Table.Cell>
                            </Subscribe>
                        {/each}
                    </Table.Row>
                </Subscribe>
            {/each}
        {/if}
    </Table.Body>
</Table.Root>
<div class="flex items-end justify-end space-x-4 py-4 px-2">
    <div>
        <Label class="text-xs mb-1" for="limit">Items por página</Label>
        <Select.Root
            onSelectedChange={(v) => {
                actualLimit = Number(v?.value);
                refreshFunction();
            }}
        >
            <Select.Trigger class="w-[96px]">
                <Select.Value placeholder={String(actualLimit)} />
            </Select.Trigger>
            <Select.Content>
                {#each limitOptions as l}
                    <Select.Item value={l}>{l}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </div>
    <Button
        variant="outline"
        size="sm"
        on:click={() => lastPage()}
        disabled={actualPage <= 1 || lastPageIndex <= 1}>Anterior</Button
    >
    <Button
        variant="outline"
        size="sm"
        disabled={actualPage >= lastPageIndex || lastPageIndex <= 1}
        on:click={() => nextPage()}>Próxima</Button
    >
</div>
