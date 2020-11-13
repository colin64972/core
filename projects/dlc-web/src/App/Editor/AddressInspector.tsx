import {
  Drawer,
  Grid,
  Hidden,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  TransformResultCell,
  TransformSummary
} from '../../store/editor/interfaces'
import {
  isProcessingSelector,
  transformResultSelector
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  TransformResults_sideDrawer: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace(),
    backgroundColor: theme.palette.grey[900]
  },
  TransformResults_innerList: {
    height: '100%'
  },
  TransformResults_addressListItem: {
    'transition': 'all 250ms linear',
    'color': theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.grey[50]
    }
  }
}))

interface Props {
  drawerOpen: boolean
  closeDrawerHandler: (event: React.MouseEvent) => void
  drawerDataName: string
  allTransforms: TransformResultCell[]
  addresses: TransformSummary[]
}

export const AddressInspector: React.FC<Props> = ({
  drawerOpen,
  closeDrawerHandler,
  drawerDataName,
  allTransforms,
  addresses
}): JSX.Element => {
  const classes = useStyles()
  if (!addresses) return null
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={closeDrawerHandler}
      PaperProps={{
        classes: {
          root: classes.TransformResults_sideDrawer
        }
      }}>
      <List className={classes.TransformResults_innerList}>
        {drawerDataName &&
          addresses.map(address => (
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
                secondary={`${allTransforms[address].original} >> ${allTransforms[address].result.w}`}
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
  )
}
