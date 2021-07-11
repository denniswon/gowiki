export function getElPos(selector: string, offsetX: number = 0, offsetY: number = 0) {
  let left = 0
  let top = 0
  let el: any = document.querySelector(selector)
  if (el == undefined) return

  while (el != undefined && el.id != 'FrameTeam') {
    left += el.offsetLeft
    top += el.offsetTop
    el = el.offsetParent
  }

  return `${left + offsetX}px, ${top + offsetY}px`
}
