// ##########################
// Imports

import pop from "../pop/index"

import Squizz from "./entities/Squizz.js"
import Level from "./Level"

// ##########################
// Game setup

const { Game, math, KeyControls } = pop

const game = new Game( 640, 320 )
const { scene, w, h } = game

const controls = new KeyControls()
const squizz = new Squizz( controls )
const level = new Level( w, h )

// ##########################
// Game objects

scene.add( level )
scene.add( squizz )

// ##########################
// Game loop

game.run( () => {
  const { pos } = squizz
  const {
    bounds: { top, bottom, left, right }
  } = level

  // Confine the player position to the bounds area
  pos.x = math.clamp( pos.x, left, right )
  pos.y = math.clamp( pos.y, top, bottom )
})
