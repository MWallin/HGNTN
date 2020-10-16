let clickers = 5
const startTime = Date.now()

import rickImage from "./../resources/images/rick.png"

//Position elements in the DOM
function sync ( dom, pos ) {
  dom.style.left = `${pos.x}px`
  dom.style.top = `${pos.y}px`
}

function addClicker () {
  const pos = {
    x: Math.random() * 500,
    y: Math.random() * 300
  }

  const img = new Image()
  img.src = rickImage
  img.style.position = `absolute`
  img.addEventListener( `click`, removeClicker, false )

  document.querySelector( `#board` ).appendChild( img )
  sync( img, pos )
}

function removeClicker ( e ) {
  e.target.parentNode.removeChild( e.target )
  clickers--
  checkGameOver()
}

function checkGameOver () {
  document.querySelector( `#remain` ).innerHTML = clickers.toString( 10 )
  if ( clickers === 0 ) {
    const taken = Math.round( ( Date.now() - startTime ) / 1000 )
    alert( `De-rick-ed in ${taken} seconds` )
  }
}

// Add all the Ricks
for ( let i = 0; i < clickers; i++ ) {
  addClicker()
}
