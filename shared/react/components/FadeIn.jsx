import gsap from 'gsap'
import React, { createRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  invisible: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}))

export const FadeIn = ({
  threshold = 0.25,
  delay = Math.random(),
  duration = Math.random() + 0.25,
  direction,
  position,
  component,
  className
}) => {
  const classes = useStyles()

  let ref = createRef()

  const [inViewRef, inView] = useInView({ threshold, triggerOnce: true })

  let timeline = gsap.timeline({
    paused: true,
    delay
  })

  useEffect(() => {
    if (inView) {
      timeline
        .add(gsap.to(ref, duration, { opacity: 1 }))
        .add(
          gsap.from(ref, duration, {
            [direction]: position,
            ease: 'back.out(1.5)'
          }),
          0
        )
        .play()
    }
  }, [inView])

  return (
    <div ref={inViewRef} className={className}>
      <div
        ref={element => {
          ref = element
        }}
        className={
          process.env.IS_BROWSER ? classes.invisible : classes.visible
        }>
        {component}
      </div>
    </div>
  )
}
