import React, { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { TimelineMax, Bounce } from 'gsap'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.custom.setSpace(),
    background: theme.palette.grey[800],
    boxShadow: theme.shadows[5],
    opacity: 0,
    minHeight: '100%',
    overflow: 'scroll',
  },
  title: {
    color: theme.palette.grey[400],
  },
}))

export default ({ ...props }) => {
  const classes = useStyles()
  let animationRef = useRef()
  const [inViewRef, inView, entry] = useInView({
    threshold: 0.25,
  })
  const [played, setPlayed] = useState(false)
  let timeline = new TimelineMax({
    paused: true,
    delay: Math.random(),
    onComplete: () => setPlayed(true),
  })
  useEffect(() => {
    if (inView && !played && !timeline.isActive()) {
      timeline
        .add(
          TweenLite.to(animationRef, 1, {
            opacity: 1,
            ease: Bounce.easeOut,
          })
        )
        .add(
          TweenLite.from(animationRef, 1, {
            ease: Bounce.easeOut,
          }),
          0
        )
        .play()
    }
    return () => {
      timeline.stop()
    }
  }, [inView, played, timeline.isActive()])
  return (
    <div className={props.style} ref={inViewRef}>
      <Paper
        className={classes.paper}
        ref={element => {
          animationRef = element
        }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        {props.child && props.child()}
      </Paper>
    </div>
  )
}
