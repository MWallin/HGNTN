import pop from "./../../pop/index"
const { TileSprite, Texture, math } = pop

import textureUrl from "./../../resources/images/player-walk.png"

const texture = new Texture( textureUrl )

class Squizz extends TileSprite {
  constructor ( controls ) {
    super( texture, 32, 32 )

    this.controls = controls

    this.setAnimations()

    this.speed = 0.15
    this.dir = {
      x: 1,
      y: 0
    }
  }

  setAnimations () {
    const { anims } = this

    anims.add(
      `walk`,
      [0, 1, 2, 3].map( x => ({
        x,
        y: 0
      }) ),
      0.08
    )

    anims.add(
      `idle`,
      [
        {
          x: 0,
          y: 0
        },
        {
          x: 4,
          y: 0
        },
        {
          x: 4,
          y: 1
        },
        {
          x: 4,
          y: 0
        }
      ],
      0.12
    )

    anims.play( `walk` )
  }

  update ( dt, t ) {
    super.update( dt )

    const { pos, speed, controls, dir } = this

    const { x, y } = controls
    if ( x && x !== dir.x ) {
      // Change to horizontal movement
      dir.x = x
      dir.y = 0
      pos.y = Math.round( pos.y / 32 ) * 32
    } else if ( y && y !== dir.y ) {
      // Change to vertical movement
      dir.x = 0
      dir.y = y
      pos.x = Math.round( pos.x / 32 ) * 32
    }

    pos.x += dir.x * dt * ( 32 / speed )
    pos.y += dir.y * dt * ( 32 / speed )
  }
}

export default Squizz
