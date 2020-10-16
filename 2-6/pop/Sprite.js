class Sprite {
  constructor ( texture ) {
    this.texture = texture

    this.pos = {
      x: 0,
      y: 0
    }

    this.anchor = {
      x: 0,
      y: 0
    }

    this.pivot = {
      x: 0,
      y: 0
    }

    this.rotation = 0

    this.scale = {
      x: 1,
      Y: 1
    }
  }
}

export default Sprite
