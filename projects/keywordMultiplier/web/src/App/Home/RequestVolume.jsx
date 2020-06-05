import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { defaultPadding } from '@colin30/shared/react/theming'
import { RequestVolumeForm } from './RequestVolumeForm'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100vh'
  },
  paper: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    [theme.breakpoints.down('md')]: {
      margin: `0 ${theme.custom.setSpace('md')}px`
    },
    [theme.breakpoints.down('sm')]: {
      margin: `0 ${theme.custom.setSpace('sm')}px`
    },
    [theme.breakpoints.down('xs')]: {
      margin: `0 ${theme.custom.setSpace('xs')}px`
    }
  },
  subHeading: {
    width: '100%',
    textAlign: 'left'
  },
  mainHeading: {
    width: '100%',
    textAlign: 'left'
  },
  body1: {
    width: '100%',
    textAlign: 'left',
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

const RequestVolume = ({ status, closeHandler, trial }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { credits, countries, currencies } = useSelector(
    state => state.keywordsEverywhere
  )

  useEffect(() => {
    if (!credits || !countries || !currencies) {
      dispatch({
        type: types.UPDATE_KEYWORDS_EVERYWHERE_OPTIONS
      })
    }
  }, [trial])

  if (credits && countries && currencies)
    return (
      <Modal
        open={status}
        onClose={closeHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={status}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.fullHeight}>
            <Paper elevation={1} className={classes.paper}>
              <FadeIn direction="x" position={-100}>
                <Typography variant="subtitle2" className={classes.subHeading}>
                  Order Form
                </Typography>
              </FadeIn>
              <FadeIn direction="x" position={-100}>
                <Typography variant="h4" className={classes.mainHeading}>
                  Request Volume Metrics
                </Typography>
              </FadeIn>
              <FadeIn direction="x" position={100}>
                <Typography variant="body1" className={classes.body1}>
                  {JSON.stringify(trial, null, 2)}
                </Typography>
              </FadeIn>
              <FadeIn direction="x" position={100}>
                <RequestVolumeForm modalCloseHandler={closeHandler} />
              </FadeIn>
            </Paper>
          </Grid>
        </Fade>
      </Modal>
    )
  return null
}

export default RequestVolume
