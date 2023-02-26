import React, { useState } from 'react'
import { rotateInUpLeft, rotateOutDownRight } from 'react-animations'
import Radium, { StyleRoot } from 'radium'

const buStyles = {
  buAnimStyle: {
    animation: 'x 6s',
    animationName: Radium.keyframes(rotateInUpLeft, 'rotate-in-up-left'),
  },
  buAnimHoverStyle: {
    animation: 'x 6s',
    animationName: Radium.keyframes(rotateOutDownRight, 'rotate-out-down-left'),
  },
}

const AnimeComponent = () => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div>
      <StyleRoot>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={isHovered ? buStyles.buAnimHoverStyle : buStyles.buAnimStyle}
        >
          <i
            style={{ fontSize: '20px' }}
            className='bi bi-x-octagon-fill text-danger'
          ></i>
        </div>
      </StyleRoot>
    </div>
  )
}

export default AnimeComponent
