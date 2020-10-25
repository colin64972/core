import gsap from 'gsap'
import React, { createRef, useEffect } from 'react'
import classnames from 'classnames'
import { useInView } from 'react-intersection-observer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  FadeInInner: {
    ...theme.custom.setFlex(),
    opacity: 0
  }
}))

export const FadeIn = ({
  threshold = 0.25,
  delay = Math.random(),
  duration = Math.random() + 0.25,
  direction,
  position,
  className,
  ...props
}) => {
  const classes = useStyles()

  let ref = createRef()

  const [inViewRef, inView] = useInView({ threshold, triggerOnce: true })

  let timeline = gsap.timeline({
    paused: true,
    delay: process.env.NODE_ENV === 'development' ? 0 : delay
  })

  let envDuration = duration
  if (process.env.NODE_ENV === 'development') {
    envDuration = 0.125
  }

  useEffect(() => {
    if (!process.env.IS_SERVER && inView) {
      timeline
        .add(gsap.to(ref, envDuration, { opacity: 1 }))
        .add(
          gsap.from(ref, envDuration, {
            [direction]: position,
            ease: 'back.out(1.5)'
          }),
          0
        )
        .play()
    }
  }, [inView])

  return (
    <div ref={inViewRef} className={className} name="FadeInOuter">
      <div
        ref={element => {
          ref = element
        }}
        name="FadeInInner"
        className={classnames(classes.FadeInInner)}>
        {props.children}
      </div>
    </div>
  )
}
