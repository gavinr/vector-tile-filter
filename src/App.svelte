<script>
  import LeftSidebar from "./lib/LeftSidebar.svelte";
  import Map from "./lib/Map.svelte";
  import "./main.css";
  import { getColorForStyleLayer } from "./utils/vectorTileLayerUtils";

  // "http://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json"
  // https://tiles.arcgis.com/tiles/1ZHcUS1lwPTg4ms0/arcgis/rest/services/NCN_Vector_Tile_Package/VectorTileServer
  let vectorTileLayerUrl =
    "https://tiles.arcgis.com/tiles/1ZHcUS1lwPTg4ms0/arcgis/rest/services/NCN_Vector_Tile_Package/VectorTileServer";

  let visibleStyleLayerIds;
  let initialStyleLayerInfos;

  const vectorTileLayerLoadedHandler = (evt) => {
    const currentStyleInfo = evt.detail;
    console.log("new vector tile layer...", currentStyleInfo);

    initialStyleLayerInfos = currentStyleInfo.style.layers.map((x) => {
      const color = getColorForStyleLayer(x);
      return {
        id: x.id,
        label: x.id,
        color: color,
      };
    });
  };

  const visibleLayersChangeHandler = (evt) => {
    visibleStyleLayerIds = evt.detail;
  };
</script>

<div class="wrapper">
  <div>
    <LeftSidebar
      {initialStyleLayerInfos}
      on:change={visibleLayersChangeHandler}
    />
  </div>
  <Map
    {vectorTileLayerUrl}
    on:vectorTileLayerLoaded={vectorTileLayerLoadedHandler}
    {visibleStyleLayerIds}
  />
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
