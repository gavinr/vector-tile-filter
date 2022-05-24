<script>
  import { createEventDispatcher } from "svelte";
  import LayerListRow from "./LayerListRow.svelte";

  const dispatch = createEventDispatcher();

  export let initialVisibleStyleLayerIds;

  let rowItems;

  $: if (initialVisibleStyleLayerIds) {
    rowItems = initialVisibleStyleLayerIds.map((x) => {
      return {
        id: x,
        label: x,
        checked: true,
      };
    });
  }

  $: if (rowItems) {
    const checkedLayers = rowItems
      .filter((x) => x.checked === true)
      .map((x) => x.id);
    dispatch("change", checkedLayers);
  }
</script>

<h2>Left Sidebar</h2>
<div>
  {#if rowItems}
    {#each rowItems as slv}
      <LayerListRow
        label={slv.label}
        checked={slv.checked}
        on:change={(evt) => {
          slv.checked = evt.detail;
        }}
      />
    {/each}
  {/if}
</div>

<style>
  /* your styles go here */
</style>
