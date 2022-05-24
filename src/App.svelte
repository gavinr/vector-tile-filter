<script>
  import LeftSidebar from "./lib/LeftSidebar.svelte";
  import Map from "./lib/Map.svelte";
  import "./main.css";
</script>

<div class="wrapper">
  <div><LeftSidebar /></div>
  <Map />
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
