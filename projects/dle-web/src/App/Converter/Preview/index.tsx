import { Backdrop, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePreview } from '../../../store/converter/actions'
import { previewOpenSelector } from '../../../store/selectors'
import { PreviewTable } from './PreviewTable'

const useStyles = makeStyles(
  theme => ({
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
      boxShadow: theme.custom.boxShadow,
      overflow: 'hidden'
    }
  }),
  {
    name: 'Preview'
  }
)

export const Preview: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const previewOpen = useSelector(previewOpenSelector)

  const closePreviewHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    dispatch(closePreview())
  }

  const keyupHandler = (event: React.KeyboardEvent<Window>): void => {
    if (event.keyCode === 27) dispatch(closePreview())
  }

  useEffect(() => {
    if (window) {
      window.addEventListener('keyup', keyupHandler)
    }
    return () => window.removeEventListener('keyup', keyupHandler)
  })

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
            onClick={closePreviewHandler}>
            Close
          </Button>
        </Grid>
        <PreviewTable />
      </div>
    </Backdrop>
  )
}
