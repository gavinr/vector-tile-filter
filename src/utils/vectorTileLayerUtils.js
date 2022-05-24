export const getColorForStyleLayer = (styleLayer) => {
  let retColor = "rgb(255, 255, 255)"; // default white

  // const styleLayer = vectorTileLayer.getStyleLayer(styleLayerId);
  // console.log('styleLayer', styleLayer);
  if (styleLayer) {
    console.log("styleLayer", styleLayer);
    if (
      styleLayer.type === "fill" &&
      "paint" in styleLayer &&
      "fill-color" in styleLayer.paint
    ) {
      retColor = styleLayer.paint["fill-color"];
    } else if (
      styleLayer.type === "line" &&
      "paint" in styleLayer &&
      "line-color" in styleLayer.paint
    ) {
      retColor = styleLayer.paint["line-color"];
    }
  }
  return retColor;
};
