import gsap from 'gsap'
import React, { createRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  innerClass: {
    ...theme.custom.setFlex(),
    width: '100%',
    opacity: 0
  }
}))

export const FadeIn = ({
  threshold = 0.25,
  delay = Math.random(),
  duration = Math.random(),
  direction,
  position,
  outerClass,
  ...props
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
        {props.children}
      </div>
    </div>
  )
}
