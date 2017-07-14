export const getPosition = (el, options) => {
  const defaultAnchor = { x: 0.5, y: 0.5 }
  const offset = { x: window.pageXOffset, y: window.pageYOffset }

  options = Object.assign({}, { defaultAnchor, offset }, ...options || {})
  let elPosition = el.getBoundingClientRect()

  const x = elPosition.left + elPosition.width * options.defaultAnchor.x + options.offset.x
  const y = elPosition.top + elPosition.height * options.defaultAnchor.y + options.offset.y
  return { x, y }
}
