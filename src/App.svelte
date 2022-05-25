<script>
  import LeftSidebar from "./lib/LeftSidebar.svelte";
  import Map from "./lib/Map.svelte";
  import "./main.css";
  import { getCSSForStyleLayer } from "./utils/vectorTileLayerUtils";

  let vectorTileLayerUrl =
    "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer";
  // let vectorTileLayerUrl =
  //   "https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_v2/VectorTileServer";
  // let vectorTileLayerUrl =
  //   "https://www.arcgis.com/sharing/rest/content/items/80be160f0ca1413d898ad4e90d197278/resources/styles/root.json";
  // let vectorTileLayerUrl ="https://tiles.arcgis.com/tiles/1ZHcUS1lwPTg4ms0/arcgis/rest/services/NCN_Vector_Tile_Package/VectorTileServer";

  let visibleStyleLayerIds;
  let initialStyleLayerInfos;

  const vectorTileLayerLoadedHandler = (evt) => {
    const currentStyleInfo = evt.detail;
    console.log("new vector tile layer...", currentStyleInfo);

    initialStyleLayerInfos = currentStyleInfo.style.layers.map((x) => {
      const css = getCSSForStyleLayer(x);
      return {
        id: x.id,
        label: x.id,
        css: css,
      };
    });
  };

  const visibleLayersChangeHandler = (evt) => {
    visibleStyleLayerIds = evt.detail;
  };
</script>

<div class="wrapper">
  <LeftSidebar
    {initialStyleLayerInfos}
    on:change={visibleLayersChangeHandler}
  />
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
