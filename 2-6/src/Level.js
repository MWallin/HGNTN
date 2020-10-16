// ##########################
// Imports

import pop from "../pop/index"
const { Texture, TileMap, math } = pop

import tilesUrl from "./../resources/images/tiles.png"

class Level extends TileMap {
  constructor ( w, h ) {
    const texture = new Texture( tilesUrl )
    const tileSize = 32
    const mapW = Math.floor( w / tileSize )
    const mapH = Math.floor( h / tileSize )

    // Make a random level of tile indexes
    const level = []
    for ( let y = 0; y < mapH; y++ ) {
      for ( let x = 0; x < mapW; x++ ) {
        level.push({
          x: math.rand( 5 ),
          y: math.rand( 2 )
        })
      }
    }

    super( level, mapW, mapH, tileSize, tileSize, texture )

    this.bounds = {
      left  : tileSize,
      right : w - tileSize * 2,
      top   : tileSize,
      bottom: h - tileSize * 2
    }
  }
}

export default Level
