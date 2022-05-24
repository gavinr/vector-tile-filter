<script>
  import { createEventDispatcher } from "svelte";
  import LayerListRow from "./LayerListRow.svelte";

  const dispatch = createEventDispatcher();

  export let initialStyleLayerInfos;

  let rowItems;

  $: if (initialStyleLayerInfos) {
    rowItems = initialStyleLayerInfos.map((x) => {
      const clone = JSON.parse(JSON.stringify(x));
      clone.checked = true;
      return clone;
    });
  }

  $: if (rowItems) {
    const checkedLayers = rowItems
      .filter((x) => x.checked === true)
      .map((x) => x.id);
    dispatch("change", checkedLayers);
  }
</script>

<h2>Layers</h2>
<div>
  {#if rowItems}
    {#each rowItems as slv}
      <LayerListRow
        label={slv.label}
        checked={slv.checked}
        color={slv.color}
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
