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

<div class="wrapper">
  <h2>Layers</h2>
  <div>
    {#if rowItems}
      {#each rowItems as slv}
        <LayerListRow
          label={slv.label}
          checked={slv.checked}
          css={slv.css}
          on:change={(evt) => {
            slv.checked = evt.detail;
          }}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .wrapper {
    max-width: 25%;
    max-height: 100%;
    overflow-y: scroll;
    padding: 5px;
  }
</style>
