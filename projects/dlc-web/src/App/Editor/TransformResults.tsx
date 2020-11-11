import { transformResult as transformResultMock } from '@cjo3/shared/react/mocks/dlc'
import {
  Grid,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Hidden,
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
    padding: theme.custom.setSpace(),
    backgroundColor: theme.palette.grey[900]
  },
  TransformResults_addressListItem: {
    'transition': 'all 250ms linear',
    'color': theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.grey[50]
    }
  }
}))

export const TransformResults: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const isProcessing = useSelector(isProcessingSelector)

  let transformResult = useSelector(transformResultSelector)

  // if (process.env.NODE_ENV === 'development') {
  //   transformResult = transformResultMock
  // }

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
      <Hidden xsDown>
        <Grid item md={1} xl={2} />
      </Hidden>
      <Grid item xs={12} md={10} xl={8}>
        <Typography variant="h3">Transform Results</Typography>
        <Typography variant="body1">
          Dolor ut voluptua sadipscing sea duo erat. Et labore est elitr sanctus
          amet dolor et at et, ipsum tempor diam lorem sit magna sed sadipscing
          consetetur, diam diam vero lorem aliquyam ut duo ut. Diam et et et
          invidunt sit invidunt voluptua sea et, sed labore no sed diam. Et.
        </Typography>
        <Grid container>
          <Grid item xs={12}></Grid>
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
                        secondary={`${transformResult.all[address].original} >> ${transformResult.all[address].result.w}`}
                        secondaryTypographyProps={{
                          align: 'center',
                          variant: 'body1',
                          color: 'secondary'
                        }}
                      />
                    </ListItem>
                  ))}
              </List>
            </Drawer>
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item md={1} xl={2} />
      </Hidden>
    </Grid>
  )
}
