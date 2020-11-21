import {
  Button,
  Grid,
  Hidden,
  LinearProgress,
  Typography
} from '@material-ui/core'
import { summaryPanels } from '../../constants'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPreview } from '../../store/converter/actions'
import {
  DataUrlCollection,
  TransformResult as ITransformResult,
  TransformSummary as ITransformSummary
} from '../../store/converter/interfaces'
import {
  isProcessingSelector,
  previewOpenSelector,
  transformResultSelector
} from '../../store/selectors'
import { AddressInspector } from './AddressInspector'
import { ExportPanel } from './ExportPanel'
import { Preview } from './Preview/'
import { TransformSummary } from './TransformSummary'

const useStyles = makeStyles(theme => ({
  TransformResults_containerBg: {
    backgroundColor: theme.palette.grey[300]
  },
  TransformResults_contentContainer: {
    ...theme.custom.contentContainer,
    padding: theme.custom.setSpace('sm')
  },
  TransformResults_changeSummaries: {
    marginTop: theme.custom.setSpace('sm')
  },
  TransformResults_intro: {
    paddingRight: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      paddingRight: 'unset'
    }
  },
  TransformResults_previewButton: {
    marginTop: theme.custom.setSpace('sm'),
    color: theme.palette.primary[50]
  }
}))

export const TransformResults: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const isProcessing: boolean = useSelector(isProcessingSelector)
  const transformResult: ITransformResult = useSelector(transformResultSelector)
  const previewOpen: boolean = useSelector(previewOpenSelector)

  // if (process.env.USE_MOCKS) {
  //   transformResult = transformResultMock
  // }

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [drawerDataName, setDrawerDataName] = useState<string | null>(null)

  const openDrawerHandler = (event: React.MouseEvent): void => {
    setDrawerDataName(event.currentTarget.name)
    setDrawerOpen(true)
  }

  const closeDrawerHandler = (event: React.MouseEvent): void => {
    setDrawerDataName(null)
    setDrawerOpen(false)
  }

  const openPreviewHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    dispatch(openPreview())
  }

  const addressesByTransform: ITransformSummary[] = drawerDataName
    ? transformResult[drawerDataName].addresses
    : []

  const dataUrlsByTransform: DataUrlCollection = drawerDataName
    ? transformResult[drawerDataName].dataUrls
    : {}

  if (isProcessing)
    return (
      <Grid item xs={12}>
        <LinearProgress color="primary" />
      </Grid>
    )

  if (!transformResult) return null

  return (
    <Grid
      container
      component="section"
      justify="center"
      data-testid="TransformResults"
      className={classes.TransformResults_containerBg}>
      <Grid
        container
        justify="center"
        className={classes.TransformResults_contentContainer}>
        <Grid item xs={12} sm={6} className={classes.TransformResults_intro}>
          <Typography variant="h3">Transform Results</Typography>
          <Typography variant="body1">
            Dolor ut voluptua sadipscing sea duo erat. Et labore est elitr
            sanctus amet dolor et at et, ipsum tempor diam lorem sit magna sed
            sadipscing consetetur, diam diam vero lorem aliquyam ut duo ut. Diam
            et et et invidunt sit invidunt voluptua sea et, sed labore no sed
            diam. Et.
          </Typography>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={openPreviewHandler}
            className={classes.TransformResults_previewButton}>
            View Preview
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ExportPanel />
        </Grid>
        <Grid item xs={12} className={classes.TransformResults_changeSummaries}>
          {summaryPanels.map(summary => (
            <TransformSummary
              key={summary.key}
              buttonName={summary.caseType}
              title={summary.title}
              caseData={transformResult[summary.caseType]}
              openDrawerHandler={openDrawerHandler}
            />
          ))}
          <AddressInspector
            drawerOpen={drawerOpen}
            closeDrawerHandler={closeDrawerHandler}
            drawerDataName={drawerDataName}
            allTransforms={transformResult.all}
            addresses={addressesByTransform}
            dataUrls={dataUrlsByTransform}
          />
          {previewOpen && <Preview />}
        </Grid>
      </Grid>
    </Grid>
  )
}
