<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = "";
  export let css;
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
    style={`display: inline-block; vertical-align: top; width: 50px; height: 24px; ${css}`}
  />
  <span
    style="font-size: 24px; vertical-align: middle"
    class:esri-icon-non-visible={!checked}
    class:esri-icon-visible={checked}
    title={checked ? "Click to hide" : "Click to show"}
  />
  <span class="labelSpan" title={label}>{label}</span>
</div>

<style>
  .line {
    margin-bottom: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    max-width: 100%;
  }
  .labelSpan {
    display: inline-block;
    padding-left: 5px;
  }
</style>
