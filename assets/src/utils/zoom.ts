// Zoom level, rounded to the nearest tenth
export const zoomLevel = (win?: Window) => {
  const w = win || window
  const zoom = w.outerWidth / w.innerWidth
  return Math.round(zoom * 10)/10
}