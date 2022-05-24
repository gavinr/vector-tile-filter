<script>
  import LeftSidebar from "./lib/LeftSidebar.svelte";
  import Map from "./lib/Map.svelte";
  import "./main.css";

  // "http://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json"
  // https://tiles.arcgis.com/tiles/1ZHcUS1lwPTg4ms0/arcgis/rest/services/NCN_Vector_Tile_Package/VectorTileServer
  let vectorTileLayerUrl =
    "https://tiles.arcgis.com/tiles/1ZHcUS1lwPTg4ms0/arcgis/rest/services/NCN_Vector_Tile_Package/VectorTileServer";

  let visibleStyleLayerIds;

  const vectorTileLayerLoadedHandler = (evt) => {
    const currentStyleInfo = evt.detail;
    console.log("new vector tile layer...", currentStyleInfo);

    visibleStyleLayerIds = currentStyleInfo.style.layers.map((x) => x.id);

    // styleLayersVisibility = currentStyleInfo.style.layers.map((styleLayer) => {
    //   return {
    //     id: styleLayer.id,
    //     checked: true,
    //     label: styleLayer.id,
    //   };
    // });
  };

  const visibleLayersChangeHandler = (evt) => {
    console.log("change", evt.detail);
    // visibleStyleLayerIds = evt.detail;
  };
</script>

<div class="wrapper">
  <div>
    <LeftSidebar
      {visibleStyleLayerIds}
      on:change={visibleLayersChangeHandler}
    />
  </div>
  <Map
    {vectorTileLayerUrl}
    on:vectorTileLayerLoaded={vectorTileLayerLoadedHandler}
  />
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
