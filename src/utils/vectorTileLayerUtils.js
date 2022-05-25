export const getCSSForStyleLayer = (styleLayer) => {
  let retCss = "background-color: rgb(255, 255, 255)"; // default white

  // const styleLayer = vectorTileLayer.getStyleLayer(styleLayerId);
  // console.log('styleLayer', styleLayer);
  if (styleLayer) {
    // console.log("styleLayer", styleLayer); // debuggin
    if (
      styleLayer.type === "fill" &&
      "paint" in styleLayer &&
      "fill-color" in styleLayer.paint
    ) {
      if (typeof styleLayer.paint["fill-color"] === "string") {
        retCss = `background-color: ${styleLayer.paint["fill-color"]};`;
      } else if ("stops" in styleLayer.paint["fill-color"]) {
        const stops = styleLayer.paint["fill-color"].stops;
        console.log("stops", stops);
        const stop = stops[0];
        const stopColor = stop[1];
        console.log(
          "todo - why is this color not look like a color?",
          stopColor
        );
        console.log("styleLayer", styleLayer);
        // retCss = `background-color: hsla(${stopColor[0]},${stopColor[1]},${stopColor[2]},${stopColor[3]});`;
      }

      if ("fill-outline-color" in styleLayer.paint) {
        if (typeof styleLayer.paint["fill-outline-color"] === "string") {
          retCss = `${retCss}; border: 1px solid ${styleLayer.paint["fill-outline-color"]}`;
        } else {
          console.log("todo?");
        }
      }
    } else if (
      styleLayer.type === "fill" &&
      "paint" in styleLayer &&
      "fill-pattern" in styleLayer.paint
    ) {
      console.log(
        "todo - handle fill-pattern:",
        styleLayer.paint["fill-pattern"]
      );
    } else if (
      styleLayer.type === "line" &&
      "paint" in styleLayer &&
      "line-color" in styleLayer.paint
    ) {
      // retColor = styleLayer.paint["line-color"];
      retCss = `background-color: ${styleLayer.paint["line-color"]}`;
    }
  }
  return retCss;
};
