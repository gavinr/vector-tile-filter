<script>
  import Map from "@arcgis/core/Map";
  import MapView from "@arcgis/core/views/MapView";
  import "@arcgis/core/assets/esri/themes/light/main.css";

  const createMap = (domNode) => {
    // Create the map
    const map = new Map({
      basemap: "streets-vector",
    });
    // Create the mapView from the map
    const view = new MapView({
      container: domNode,
      map: map,
      zoom: 8,
      center: [-90, 38], // longitude, latitude
    });
    // Use the watch functionality of the JavaScript API (view.watch) to call a
    // function every time the extent changes. Every time it does, update the
    // "centerText" variable - Svelte takes care of updating the UI based
    // on this variable assignment
    // (Reactivity!) https://svelte.dev/tutorial/reactive-assignments
    // view.watch("center", (center) => {
    //   const { latitude, longitude } = center;
    //   centerText = `Lat: ${latitude.toFixed(2)} | Lon: ${longitude.toFixed(2)}`;
    // });
  };
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
