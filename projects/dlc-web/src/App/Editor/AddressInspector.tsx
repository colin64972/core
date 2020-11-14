import { Drawer, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import {
  TransformResultCellCollection,
  TransformSummary
} from '../../store/editor/interfaces'

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
    marginTop: theme.custom.setSpace(),
    ...theme.custom.noSelect,
    ...theme.custom.setFlex('column'),
    'transition': 'all 250ms linear',
    'color': theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.grey[50]
    }
  },
  AddressInspector_white: {
    color: theme.palette.grey[50]
  }
}))

interface Props {
  drawerOpen: boolean
  closeDrawerHandler: (event: React.MouseEvent) => void
  drawerDataName: string
  allTransforms: TransformResultCellCollection
  addresses: TransformSummary[]
  dataUrls: {
    [key: string]: {
      original: string
      transform: string
    }
  }
}

export const AddressInspector: React.FC<Props> = ({
  drawerOpen,
  closeDrawerHandler,
  drawerDataName,
  allTransforms,
  addresses,
  dataUrls
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
          addresses.map(address => {
            const dataUrl =
              dataUrls[allTransforms[address].meta.original.w].transformWhite
            const imageStyle = {
              userSelect: 'none',
              msUserSelect: 'none',
              OUserSelect: 'none',
              MozUserSelect: 'none',
              KhtmlUserSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              width: '8rem',
              height: '2rem',
              border: '1px solid #616161',
              borderRadius: 4,
              backgroundImage: `url(${dataUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              top: 1
            }
            return (
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
                <Grid container justify="center" alignItems="center">
                  <Typography variant="h6" color="primary">{allTransforms[address].meta.original.w}</Typography>
                  &emsp;
                  <Typography variant="h6" className={classes.AddressInspector_white}>>></Typography>
                  &emsp;
                  <div style={imageStyle} />
                </Grid>
              </ListItem>
            )
          })}
      </List>
    </Drawer>
  )
}
