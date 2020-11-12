import { Backdrop, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePreview } from '../../../store/editor/actions'
import { previewOpenSelector } from '../../../store/selectors'
import { PreviewTable } from './PreviewTable/'

const useStyles = makeStyles(theme => ({
  Preview_backdrop: {
    width: '100vw',
    height: '100vh',
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0
  },
  Preview_container: {
    ...theme.custom.borderRadius,
    width: `calc(100% - ${theme.custom.setSpace('md')}px * 2)`,
    height: `calc(100% - ${theme.custom.setSpace('md')}px * 2)`,
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[50],
    boxShadow: '0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  }
}))

export const Preview: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let previewOpen = useSelector(previewOpenSelector)

  if (process.env.NODE_ENV === 'development') {
    previewOpen = true
  }

  const closeHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
    dispatch(closePreview())
  }

  if (!previewOpen) return null

  return (
    <Backdrop open={previewOpen} className={classes.Preview_backdrop}>
      <div className={classes.Preview_container}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h3">Sheet Preview</Typography>
          <Button
            type="button"
            color="primary"
            variant="outlined"
            onClick={closeHandler}>
            Close
          </Button>
        </Grid>
        <PreviewTable />
      </div>
    </Backdrop>
  )
}
