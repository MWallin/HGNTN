/**
 * @param {string} id
 */
export function getCanvasElementById ( id ) {
  const canvas = document.getElementById( id )

  if ( !( canvas instanceof HTMLCanvasElement ) ) {
    throw new Error(
      `The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`
    )
  }

  return canvas
}

/**
 * @param {HTMLCanvasElement} canvas
 */
export function getCanvasRenderingContext2D ( canvas ) {
  const context = canvas.getContext( `2d` )

  if ( context === null ) {
    throw new Error( `This browser does not support 2-dimensional canvas rendering contexts.` )
  }

  return context
}
