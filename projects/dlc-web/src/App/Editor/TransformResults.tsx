import { transformResult as transformResultMock } from '@cjo3/shared/react/mocks/dlc'
import {
  Grid,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  isProcessingSelector,
  transformResultSelector
} from '../../store/selectors'
import { TransformSummary } from './TransformSummary'

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
    width: theme.custom.setSpace('lg'),
    backgroundColor: theme.palette.grey[900]
  },
  TransformResults_addressListItem: {
    'transition': 'all 250ms linear',
    'color': theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

export const TransformResults: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const isProcessing = useSelector(isProcessingSelector)

  let transformResult = useSelector(transformResultSelector)

  if (process.env.NODE_ENV === 'development') {
    transformResult = transformResultMock
  }

  if (isProcessing)
    return (
      <Grid item xs={12}>
        <LinearProgress color="primary" />
      </Grid>
    )

  if (!transformResult) return null

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [drawerDataName, setDrawerDataName] = useState<string | null>(null)

  const openDrawerHandler = (event: React.MouseEvent) => {
    setDrawerDataName(event.currentTarget.name)
    setDrawerOpen(true)
  }

  const closeDrawerHandler = (event: React.MouseEvent): void => {
    setDrawerDataName(null)
    setDrawerOpen(false)
  }

  return (
    <Grid container component="section" className={classes.TransformResults_bg}>
      <Grid item xs={12}>
        <Typography variant="h3">Transform Results</Typography>
        <Typography variant="body1">
          Dolor ut voluptua sadipscing sea duo erat. Et labore est elitr sanctus
          amet dolor et at et, ipsum tempor diam lorem sit magna sed sadipscing
          consetetur, diam diam vero lorem aliquyam ut duo ut. Diam et et et
          invidunt sit invidunt voluptua sea et, sed labore no sed diam. Et.
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.TransformResults_changeSummaries}>
        <TransformSummary
          buttonName="ul"
          title="Under Limit Case"
          caseData={transformResult.ul}
          openDrawerHandler={openDrawerHandler}
        />
        <TransformSummary
          buttonName="ol"
          title="Over Limit Case"
          caseData={transformResult.ol}
          openDrawerHandler={openDrawerHandler}
        />
        <TransformSummary
          buttonName="zero"
          title="Zero Case"
          caseData={transformResult.zero}
          openDrawerHandler={openDrawerHandler}
        />
      </Grid>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawerHandler}
        PaperProps={{
          classes: {
            root: classes.TransformResults_sideDrawer
          }
        }}>
        <List>
          {drawerDataName &&
            transformResult[drawerDataName].addresses.map(address => (
              <ListItem
                key={`drawer-data-item-${address}`}
                className={classes.TransformResults_addressListItem}
                alignItems="center">
                <ListItemText
                  primary={address}
                  primaryTypographyProps={{
                    align: 'center',
                    variant: 'h5'
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Grid>
  )
}
