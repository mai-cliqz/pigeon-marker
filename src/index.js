import React, { Component, PropTypes } from 'react'

import pin from './img/pin.png'
import pinRetina from './img/pin@2x.png'
import pinHover from './img/pin-hover.png'
import pinHoverRetina from './img/pin-hover@2x.png'

const imageOffset = {
  left: 15,
  top: 31
}

export default class Marker extends Component {
  static propTypes = {
    // input
    position: PropTypes.array.isRequired,
    payload: PropTypes.any, // passed to events

    // modifiers
    hover: PropTypes.bool,

    // callbacks
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,

    // pigeon variables
    left: PropTypes.number,
    top: PropTypes.number,

    // pigeon functions
    latLngToPixel: PropTypes.func,
    pixelToLatLng: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  // controls
  isRetina () {
    return typeof window !== 'undefined' && window.devicePixelRatio >= 2
  }

  // modifiers
  isHover () {
    return typeof this.props.hover === 'boolean' ? this.props.hover : this.state.hover
  }

  image () {
    return this.isRetina() ? (this.isHover() ? pinHoverRetina : pinRetina) : (this.isHover() ? pinHover : pin)
  }

  // lifecycle

  componentDidMount () {
    let images = this.isRetina() ? [
      pinRetina, pinHoverRetina
    ] : [
      pin, pinHover
    ]

    images.forEach(image => {
      let img = new window.Image()
      img.src = image
    })
  }

  // delegators

  eventParameters = (event) => ({
    event,
    payload: this.props.payload,
    position: this.props.position
  })

  handleClick = (event) => {
    this.props.onClick && this.props.onClick(this.eventParameters())
  }

  handleContextMenu = (event) => {
    this.props.onContextMenu && this.props.onContextMenu(this.eventParameters())
  }

  handleMouseOver = (event) => {
    this.props.onMouseOver && this.props.onMouseOver(this.eventParameters())
    this.setState({ hover: true })
  }

  handleMouseOut = (event) => {
    this.props.onMouseOut && this.props.onMouseOut(this.eventParameters())
    this.setState({ hover: false })
  }

  // render

  render () {
    const { left, top, onClick } = this.props

    return (
      <div style={{ position: 'absolute', left: left - imageOffset.left, top: top - imageOffset.top, cursor: onClick ? 'pointer' : 'default' }}
           className='pigeon-click-block'
           onClick={this.handleClick}
           onContextMenu={this.handleContextMenu}
           onMouseOver={this.handleMouseOver}
           onMouseOut={this.handleMouseOut}>
        <img src={this.image()} width={29} height={34} alt='' />
      </div>
    )
  }
}