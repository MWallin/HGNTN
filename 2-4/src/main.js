import * as cH from "../lib/canvas"
// import KeyControls from "../lib/KeyControls"
import MouseControls from "../lib/MouseControls"

const canvas = cH.getCanvasElementById( `canvasBoard` )
const ctx = cH.getCanvasRenderingContext2D( canvas )

const { width: w, height: h } = canvas
let dt = 0
let last = 0

// ##########################
// Game setup

// let x = w / 2
// let y = h / 2
let color = 0

// const controls = new KeyControls()
const mouse = new MouseControls( canvas )

function loopy ( ms ) {
  requestAnimationFrame( loopy )

  const t = ms / 1000 // Convert to seconds
  dt = t - last
  last = t

  // ##########################
  // Game logic
  const x = mouse.pos.x
  const y = mouse.pos.y

  if ( mouse.down ) {
    color += 10

    if ( color > 360 ) {
      color -= 360
    }
  }

  // Draw the rectangle
  ctx.fillStyle = `hsl(${color}, 50%, 50%)`
  ctx.fillRect( x, y, 50, 50 )

  mouse.update()
}

requestAnimationFrame( loopy )
