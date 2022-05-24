<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = "";
  export let color;
  export let checked = true;

  $: {
    dispatch("change", checked);
  }
</script>

<div
  class="line"
  on:click={() => {
    checked = !checked;
  }}
>
  <div
    style={`display: inline-block; vertical-align: top; width: 50px; height: 24px; background-color: ${color}`}
  />
  <span
    style="font-size: 24px; vertical-align: middle"
    class:esri-icon-non-visible={!checked}
    class:esri-icon-visible={checked}
  />
  <span class="labelSpan">{label}</span>
</div>

<style>
  .line {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .labelSpan {
    display: inline-block;
    padding-left: 5px;
  }
</style>
