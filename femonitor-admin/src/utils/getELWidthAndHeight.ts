export const getElWidthAndHeight = (el: HTMLElement) => {
  return {
    width: window.getComputedStyle(el).width,
    height: window.getComputedStyle(el).height
  };
};
export const computeWidthAndHeight = ({
  width,
  height
}: {
  width: string;
  height: string;
}) => {
  // debugger;
  const index1 = width.indexOf("p");
  const index2 = height.indexOf("p");
  const mapWidth = Number(width.substring(0, index1)) * 0.9 + "px";
  const mapHeight = Number(height.substring(0, index2)) * 0.9 + "px";
  console.log(mapWidth, mapHeight);

  return {
    width: mapWidth,
    height: mapHeight
  };
};
