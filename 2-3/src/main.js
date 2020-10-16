import * as cH from "./canvas"

const canvas = cH.getCanvasElementById( `canvasBoard` )
const ctx = cH.getCanvasRenderingContext2D( canvas )

const { width: w, height: h } = canvas

// ##########################
// Game setup

ctx.strokeStyle = `#fff`
ctx.font = `30pt monospace`

let dt = 0
let last = 0

const speed = 64
let p1 = 0
let p2 = 0

function loopy ( ms ) {
  requestAnimationFrame( loopy )

  const t = ms / 1000 // Convert to seconds
  dt = t - last
  last = t

  // ##########################
  // Game logic
  ctx.fillStyle = `#000`
  ctx.fillRect( 0, 0, w, h )

  ctx.strokeText( `Frame length ${( dt * 1000 ).toFixed( 2 )} ms`, 70, 50 )
  ctx.strokeText( `Total time ${t.toFixed( 2 )}`, 70, 90 )

  p1 += speed * dt
  p2 += speed * ( 1 / 60 )

  if ( p1 > w ) {
    p1 -= w + 50
  }

  if ( p2 > w ) {
    p2 -= w + 50
  }

  ctx.fillStyle = `#f00`

  ctx.fillRect( p1, 120, 50, 50 )
  ctx.fillRect( p2, 190, 50, 50 )
}

requestAnimationFrame( loopy )
