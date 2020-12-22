import React, { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TimelineMax, TweenLite } from 'gsap'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fullWidth: {
    minWidth: '100%',
  },
  invisible: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}))

export default ({ ...props }) => {
  const { animation, component } = props
  const classes = useStyles()
  let animationRef = useRef()
  const [played, setPlayed] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: animation.threshhold,
    triggerOnce: true,
  })
  let timeline = new TimelineMax({
    paused: animation.paused,
    delay: animation.delay,
  })
  useEffect(() => {
    if (inView && !played) {
      timeline
        .add(TweenLite.to(animationRef, animation.duration, animation.to))
        .add(
          TweenLite.from(animationRef, animation.duration, animation.from),
          0
        )
        .play()
      setPlayed(true)
    }
  }, [inView])
  return (
    <div ref={inViewRef} className={classes.fullWidth}>
      <div
        className={classes.fullWidth}
        ref={element => {
          animationRef = element
        }}
        className={classes.invisible}>
        {component}
      </div>
    </div>
  )
}
