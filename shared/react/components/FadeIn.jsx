import React, { createRef, useEffect } from 'react'

import PropTypes from 'prop-types'
import gsap from 'gsap'
import { makeStyles } from '@material-ui/core/styles'
import { useInView } from 'react-intersection-observer'

const useStyles = makeStyles(theme => ({
  innerClass: {
    ...theme.custom.setFlex(),
    width: '100%',
    opacity: 0
  }
}))

export const FadeIn = ({
  children,
  delay = Math.random(),
  direction,
  duration = Math.random(),
  outerClass,
  position,
  threshold = 0.25
}) => {
  const classes = useStyles()

  let ref = createRef()

  const [inViewRef, inView] = useInView({ threshold, triggerOnce: true })

  let timeline = gsap.timeline({
    paused: true,
    delay
  })

  let envDuration = duration
  if (process.env.NODE_ENV === 'development') {
    envDuration = 0.25
  }

  useEffect(() => {
    if (inView) {
      timeline
        .add(gsap.to(ref, { opacity: 1, duration: envDuration }))
        .add(
          gsap.from(ref, {
            duration: envDuration,
            [direction]: position,
            ease: 'back.out(1.5)'
          }),
          0
        )
        .play()
    }
  }, [inView])

  return (
    <div ref={inViewRef} className={outerClass} name="FadeInOuter">
      <div
        ref={element => {
          ref = element
        }}
        name="FadeInInner"
        className={classes.innerClass}>
        {children}
      </div>
    </div>
  )
}

FadeIn.propTypes = {
  children: PropTypes.element.isRequired,
  delay: PropTypes.number,
  direction: PropTypes.string,
  duration: PropTypes.number,
  outerClass: PropTypes.string,
  position: PropTypes.number,
  threshold: PropTypes.number
}
