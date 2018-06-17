export function getAbsPosition(element) {
  const p = { x: element.x, y: element.y }
  let parent = element.parent
  let count = 0
  while (parent && parent.x !== undefined) {
    p.x += parent.x
    p.y += parent.y
    parent = parent.parent
    count++
    if (count > 1000) {
      console.error('too many loop', element)
      break
    }
  }
  return p
}
