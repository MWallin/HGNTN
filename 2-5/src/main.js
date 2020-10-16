import pop from "../pop/index"
const { Container, KeyControls, CanvasRenderer, Texture, Sprite, Text } = pop

import spaceshipUrl from "./../resources/images/spaceship.png"
import bgUrl from "./../resources/images/bg.png"
import bulletUrl from "./../resources/images/bullet.png"
import baddieUrl from "./../resources/images/baddie.png"

// ##########################
// Game setup

const w = 640
const h = 300
const renderer = new CanvasRenderer( w, h )
document.querySelector( `#board` ).appendChild( renderer.view )

// ##########################
// Load game textures
const textures = {
  background: new Texture( bgUrl ),
  spaceship : new Texture( spaceshipUrl ),
  bullet    : new Texture( bulletUrl ),
  baddie    : new Texture( baddieUrl )
}

// ##########################
// Game objects
const scene = new Container()
const controls = new KeyControls()

// Player
const ship = new Sprite( textures.spaceship )
ship.pos.x = 120
ship.pos.y = h / 2 - 16
ship.update = function ( dt, t ) {
  const { pos } = this
  pos.x += controls.x * dt * 200
  pos.y += controls.y * dt * 200

  if ( pos.x < 0 ) {
    pos.x = 0
  }
  if ( pos.x > w ) {
    pos.x = w
  }
  if ( pos.y < 0 ) {
    pos.y = 0
  }
  if ( pos.y > h ) {
    pos.y = h
  }
}

scene.add( new Sprite( textures.background ) )
scene.add( ship )

// Bullets
const bullets = new Container()
scene.add( bullets )

function fireBullet ( x, y ) {
  const bullet = new Sprite( textures.bullet )
  bullet.pos.x = x
  bullet.pos.y = y
  bullet.update = function ( dt ) {
    this.pos.x += 400 * dt
  }
  bullets.add( bullet )
}

// Baddies
const baddies = new Container()
scene.add( baddies )

function addBaddie ( x, y, speed ) {
  const baddie = new Sprite( textures.baddie )
  baddie.pos.x = x
  baddie.pos.y = y
  baddie.update = function ( dt ) {
    this.pos.x += speed * dt
  }
  baddies.add( baddie )
}

// Score
const score = new Text( `score:`, {
  font : `20px sans-serif`,
  fill : `#8B8994`,
  align: `center`
})
score.pos.x = w / 2
score.pos.y = h - 30
scene.add( score )

function doGameOver () {
  const gameOverMessage = new Text( `Game Over`, {
    font : `30pt sans-serif`,
    fill : `8B8994`,
    align: `center`
  })
  gameOverMessage.pos = {
    x: w / 2,
    y: 120
  }

  scene.add( gameOverMessage )
  scene.remove( ship )
  gameOver = true
}

// Game state
let lastShot = 0
let lastSpawn = 0
let spawnSpeed = 1.0
let scoreAmount = 0
let gameOver = false

// ##########################
// The game loop

let dt = 0
let last = 0

function loopy ( ms ) {
  requestAnimationFrame( loopy )
  const t = ms / 1000
  dt = t - last
  last = t

  // Game logic code
  ship.pos.x += Math.sin( t * 10 )
  score.text = `score: ${scoreAmount}`

  if ( t - lastSpawn > spawnSpeed ) {
    lastSpawn = t
    const speed = -50 - Math.random() * Math.random() * 100
    const position = Math.random() * ( h - 24 )
    addBaddie( w, position, speed )

    // Acceleration for the next spawn
    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.98 + 0.001
  }

  if ( !gameOver && controls.action && t - lastShot > 0.1 ) {
    lastShot = t
    fireBullet( ship.pos.x + 24, ship.pos.y + 10 )
  }

  baddies.children.forEach( baddie => {
    if ( baddie.pos.x < 0 ) {
      if ( !gameOver ) {
        doGameOver()
      }
      baddie.dead = true
    }
  })

  // Destroy bullets when they go out of the screen
  bullets.children.forEach( bullet => {
    if ( bullet.pos.x > w + 20 ) {
      bullet.dead = true
    }

    baddies.children.forEach( baddie => {
      const dx = baddie.pos.x + 16 - ( bullet.pos.x + 8 )
      const dy = baddie.pos.y + 16 - ( bullet.pos.y + 8 )

      if ( Math.sqrt( dx * dx + dy * dy ) < 24 ) {
        baddie.dead = true
        bullet.dead = true
        scoreAmount += Math.floor( t )
      }
    })
  })

  // Update & render everything
  scene.update( dt, t )
  renderer.render( scene )
}

requestAnimationFrame( loopy )
