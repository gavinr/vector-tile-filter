<script>
  import { createEventDispatcher } from "svelte";

  import Map from "@arcgis/core/Map";
  import MapView from "@arcgis/core/views/MapView";
  import "@arcgis/core/assets/esri/themes/light/main.css";
  import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
  import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

  export let vectorTileLayerUrl;
  export let visibleStyleLayerIds;

  let vectorTileLayer;

  const dispatch = createEventDispatcher();

  let mapView;

  const createMap = (domNode) => {
    const map = new Map({
      basemap: "gray-vector",
    });

    const view = new MapView({
      container: domNode,
      map: map,
      zoom: 1,
      center: [0, 0], // longitude, latitude
    });

    view.when(() => {
      mapView = view;
    });
  };

  $: if (
    vectorTileLayer &&
    "currentStyleInfo" in vectorTileLayer &&
    visibleStyleLayerIds
  ) {
    vectorTileLayer.currentStyleInfo.style.layers.forEach((layer) => {
      const layerId = layer.id;
      const visible =
        visibleStyleLayerIds.indexOf(layerId) > -1 ? "visible" : "none";
      vectorTileLayer.setStyleLayerVisibility(layerId, visible);
    });
  }

  $: if (mapView && vectorTileLayerUrl) {
    const vtl = new VectorTileLayer({
      url: vectorTileLayerUrl,
    });
    mapView.map.add(vtl);
    reactiveUtils
      .whenOnce(() => vtl.loaded)
      .then(() => {
        vectorTileLayer = vtl;
        dispatch("vectorTileLayerLoaded", vtl.currentStyleInfo);
        console.log("vtl.currentStyleInfo", vtl.currentStyleInfo);
        mapView.goTo(vtl.currentStyleInfo.layerDefinition.initialExtent);
      });
  }
</script>

<!-- use:createMap calls the "createMap" function (defined above) when the  -->
<!-- element is created. -->
<!-- See the "createMap" function def above for more info. -->
<div class="view" use:createMap />

<style>
  /* Alternative to the CSS import in the script tag above: */
  /* @import "@arcgis/core/assets/esri/themes/light/main.css"; */
  .view {
    height: 100%;
    width: 100%;
  }
</style>
