import { createLoadable } from '@cjo3/shared/react/createLoadable'
import {
  Button,
  Grid,
  Hidden,
  LinearProgress,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPreview } from '../../store/editor/actions'
import {
  TransformSummary as ITransformSummary,
  TransformResult as ITransformResult,
  DataUrlCollection
} from '../../store/editor/interfaces'
import {
  isProcessingSelector,
  previewOpenSelector,
  transformResultSelector
} from '../../store/selectors'
import { AddressInspector } from './AddressInspector'
import { ExportPanel } from './ExportPanel'
import { TransformSummary } from './TransformSummary'

const PreviewLoadable = createLoadable(
  'Preview',
  import(
    /* webpackChunkName: "chunk-Preview" */
    './Preview'
  )
)

const useStyles = makeStyles(theme => ({
  TransformResults_bg: {
    padding: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.grey[300]
  },
  TransformResults_changeSummaries: {
    marginTop: theme.custom.setSpace('sm')
  },
  TransformResults_sideDrawer: {
    ...theme.custom.setFlex('column'),
    height: '100%',
    padding: theme.custom.setSpace(),
    backgroundColor: theme.palette.grey[900]
  },
  TransformResults_addressListItem: {
    'transition': 'all 250ms linear',
    'color': theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.grey[50]
    }
  },
  TransformResults_intro: {
    paddingRight: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      paddingRight: 'unset'
    }
  },
  TransformResults_previewButton: {
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`,
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
      alignItems="center"
      data-testid="TransformResults"
      className={classes.TransformResults_bg}>
      {previewOpen && <PreviewLoadable />}
      <Hidden xsDown>
        <Grid item md={1} xl={2} />
      </Hidden>
      <Grid item xs={12} md={10} xl={8}>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} sm={6} className={classes.TransformResults_intro}>
            <Typography variant="h3">Transform Results</Typography>
            <Typography variant="body1">
              Dolor ut voluptua sadipscing sea duo erat. Et labore est elitr
              sanctus amet dolor et at et, ipsum tempor diam lorem sit magna sed
              sadipscing consetetur, diam diam vero lorem aliquyam ut duo ut.
              Diam et et et invidunt sit invidunt voluptua sea et, sed labore no
              sed diam. Et.
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
          <ExportPanel />
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.TransformResults_changeSummaries}>
            <TransformSummary
              buttonName="ul"
              title="Under Limit Cases"
              caseData={transformResult.ul}
              openDrawerHandler={openDrawerHandler}
            />
            <TransformSummary
              buttonName="ol"
              title="Over Limit Cases"
              caseData={transformResult.ol}
              openDrawerHandler={openDrawerHandler}
            />
            <TransformSummary
              buttonName="zero"
              title="Zero Cases"
              caseData={transformResult.zero}
              openDrawerHandler={openDrawerHandler}
            />
            <AddressInspector
              drawerOpen={drawerOpen}
              closeDrawerHandler={closeDrawerHandler}
              drawerDataName={drawerDataName}
              allTransforms={transformResult.all}
              addresses={addressesByTransform}
              dataUrls={dataUrlsByTransform}
            />
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item md={1} xl={2} />
      </Hidden>
    </Grid>
  )
}
