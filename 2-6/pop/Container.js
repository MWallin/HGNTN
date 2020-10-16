class Container {
  constructor () {
    this.pos = {
      x: 0,
      y: 0
    }
    this.children = []
  }

  // Container methods
  add ( child ) {
    this.children.push( child )
    return child
  }

  remove ( child ) {
    this.children = this.children.filter( c => c !== child )
    return child
  }

  map ( f ) {
    return this.children.map( f
    )
  }

  update ( dt, t ) {
    this.children = this.children.filter( child => {
      if ( child.update ) {
        child.update( dt, t, this )
      }
      return child.dead ? false : true
    })

    // this.children.forEach( child => {
    //   if ( child.update ) {
    //     child.update( dt, t )
    //   }
    // })
  }
}

export default Container
