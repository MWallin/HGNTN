// const canvas = document.querySelector( `#board canvas` )
// const ctx = canvas.getContext( `2d` )

/**
 * @param {string} id
 */
const getCanvasElementById = id => {
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
const getCanvasRenderingContext2D = canvas => {
  const context = canvas.getContext( `2d` )

  if ( context === null ) {
    throw new Error( `This browser does not support 2-dimensional canvas rendering contexts.` )
  }

  return context
}

const canvas = getCanvasElementById( `canvasBoard` )
const ctx = getCanvasRenderingContext2D( canvas )

const { width: w, height: h } = canvas

// ----------------------
// ----------------------

// #######################################################
// Starscape
// const { width: w, height: h } = canvas




ctx.fillStyle = `#444`

let x = 0
let y = 0
let radius = 0

for ( let i = 0; i < 750; i++ ) {
  x = Math.random() * w
  y = Math.random() * h

  radius = Math.random() * 3

  ctx.beginPath()
  ctx.arc( x, y, radius, 0, Math.PI * 2, false )
  ctx.fill()
}

// #######################################################
// Logo

ctx.translate( 225, 150 )

// Draw the words as a mask
ctx.font = `bold 70pt monospace`
ctx.fillStyle = `black`
ctx.fillText( `MOM`, 10, 60 )
ctx.fillText( `POP`, 10, 118 )

// Draw lines over the mask
ctx.globalCompositeOperation = `source-atop`

//Rainbow
for ( let i = 0; i < 6; i++ ) {
  ctx.fillStyle = `hsl(${i * ( 250 / 6 )}, 90%, 55%)`
  ctx.fillRect( 0, i * 20, 200, 20 )
}

// DropShadow
ctx.fillStyle = `#999`
ctx.globalCompositeOperation = `destination-over`
ctx.fillText( `MOM`, 13, 62 )
ctx.fillText( `POP`, 13, 120 )
ctx.font = `30pt monospace`

// Back to default
ctx.globalCompositeOperation = `source-over`

const text = `games`
// Add Characters (so they are evenly spaced)
text.split( `` ).forEach( ( ch, i ) => {
  ctx.fillText( ch, i * 37 + 12, 145 )
})

// #######################################################
// Blending and Alpha

// // #######################################################
// // Kaleidoscope

// ctx.translate( w / 2, h / 2 )

// for ( let ring = 1; ring < 28; ring++ ) {
//   ctx.fillStyle = `hsl(${ring * 25}, 90%, 50%)`

//   for ( let dots = 0; dots < ring * 6; dots++ ) {
//     ctx.rotate( ( Math.PI * 2 ) / ( ring * 6 ) )
//     ctx.beginPath()
//     ctx.arc( 0, ring * 15, 7, 0, Math.PI * 2, true )
//     ctx.fill()
//   }
// }

// // #######################################################
// // Transformations

// function draw () {
//   for ( let i = 0; i < 100; i++ ) {
//     const x = Math.random() * w
//     const y = Math.random() * h
//     ctx.fillRect( x, y, 50, 50 )
//   }
// }

// ctx.fillStyle = `black`
// draw()

// ctx.save()
// ctx.fillStyle = `red`
// draw()
// ctx.restore()

// draw()

// // #######################################################
// // Rick again

// import imgSource from "./../resources/images/rick.png"

// const img = new Image()
// img.src = imgSource
// img.addEventListener( `load`, draw, false )

// function draw () {
//   ctx.drawImage( img, 170, 140 )

//   for ( let i = 0; i < 22; i++ ) {
//     ctx.drawImage(
//       Image
//       img,
//       Source
//       32,
//       0,
//       53,
//       75,
//       Destination Location
//       i * 20,
//       i * 10,
//       Desitation Scale
//       i * 0.2 * 53,
//       i * 0.2 * 75
//     )
//   }
// }

// // #######################################################
// // Snowfield

// import imgSource from "./../resources/images/snowflake.png"

// const img = new Image()
// img.src = imgSource
// img.addEventListener( `load`, draw, false )

// function draw () {
//   const { width, height } = img

//   for ( let i = 0; i < 100; i++ ) {
//     const x = Math.random() * w
//     const y = Math.random() * h
//     const scale = Math.random()

//     ctx.drawImage( img, x, y, width * scale, height * scale )
//   }
// }

// // #######################################################
// // Text
// ctx.font = `20pt courier`

// const center = w / 2

// ctx.textAlign = `center`

// for ( let i = 0; i < 11; i++ ) {
//   ctx.fillText( `If you're in the game...`, center, i* 40 )
// }

// ctx.strokeText( `Strokes the world!`, center, h - 30 )


// // #######################################################
// // Basic shapes
// // Solid square
// ctx.fillStyle = `red`
// ctx.fillRect( 300, 200, 50, 50 )

// // Outline square
// ctx.strokeStyle = `black`
// ctx.strokeRect( 200, 200, 50, 50 )

// // Outlined and filled circle
// ctx.beginPath()
// ctx.arc( 325, 170, 25, 0, Math.PI * 2, false )
// ctx.fill()
// ctx.stroke()
// ctx.closePath()
