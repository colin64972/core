import { TweenMax } from 'gsap'
import Button from '@material-ui/core/Button'
import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { defaultPadding } from '@colin30/shared/react/theming'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100vh'
  },
  paper: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    [theme.breakpoints.down('sm')]: {
      margin: `0 ${theme.custom.setSpace()}px`
    }
  },
  closeButton: {
    float: 'right'
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
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.fullHeight}>
                <Grid item xs={12} md={10} lg={8}>
                  <Paper elevation={1} className={classes.paper}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={closeHandler}
                      className={classes.closeButton}>
                      Close
                    </Button>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h3">
                          Volume Request Options
                        </Typography>
                        <Typography variant="body1">
                          {JSON.stringify(trial, null, 2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    )
  return null
}

export default RequestVolume
