class CanvasRenderer {
  constructor ( w, h ) {
    const canvas = document.createElement( `canvas` )
    this.w = canvas.width = w
    this.h = canvas.height = h
    this.view = canvas
    this.ctx = canvas.getContext( `2d` )

    this.ctx.textBaseline = `top`
  }

  render ( container, clear = true ) {
    const { ctx } = this

    function renderRec ( container ) {
      // Render the container children
      container.children.forEach( child => {
        if ( child.visible == false ) {
          return
        }

        ctx.save()

        // Handle transforms
        if ( child.pos ) {
          ctx.translate( Math.round( child.pos.x ), Math.round( child.pos.y ) )
        }

        if ( child.anchor ) {
          ctx.translate( Math.round( child.anchor.x ), Math.round( child.anchor.y ) )
        }

        if ( child.scale ) {
          ctx.scale( child.scale.x, child.scale.y )
        }

        if ( child.rotation ) {
          const px = child.pivot ? child.pivot.x : 0
          const py = child.pivot ? child.pivot.y : 0

          ctx.translate( px, py )
          ctx.rotate( child.rotation )
          ctx.translate( -px, -py )
        }

        // Handle the child types
        if ( child.text ) {
          const { font, fill, align } = child.style
          if ( font ) {
            ctx.font = font
          }

          if ( fill ) {
            ctx.fillStyle = fill
          }
          if ( align ) {
            ctx.textAlign = align
          }

          ctx.fillText( child.text, 0, 0 )
        } else if ( child.texture ) {
          const img = child.texture.img

          if ( child.tileW ) {
            ctx.drawImage(
              img,
              child.frame.x * child.tileW, // Source X
              child.frame.y * child.tileH, // Source Y
              child.tileW, // Width
              child.tileH, // Hieght
              0, // Destination X
              0, // Destination Y
              child.tileW, // Destination Widht
              child.tileH // DEstination Height
            )
          } else {
            ctx.drawImage( child.texture.img, 0, 0 )
          }
        }

        // Render any child sub-nodes
        if ( child.children ) {
          renderRec( child )
        }

        ctx.restore()
      })
    }

    if ( clear ) {
      ctx.clearRect( 0, 0, this.w, this.h )
    }

    renderRec( container )
  }
}

export default CanvasRenderer
