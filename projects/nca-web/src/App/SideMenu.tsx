import NcaLogoGrey from '@cjo3/shared/assets/svgs/nca-logo-grey'
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { NavButtonSet } from './NavButtonSet'

const useStyles = makeStyles(
  theme => ({
    sideMenuBg: {
      padding: theme.custom.setSpace('sm'),
      backgroundColor: theme.palette.grey[900]
    },
    logo: {
      marginTop: theme.custom.setSpace('sm'),
      height: theme.custom.setSpace('sm')
    }
  }),
  {
    name: 'SideMenu'
  }
)

interface Props {
  open: boolean
  closeHandler: () => void
}

export const SideMenu: React.FC<Props> = ({
  open,
  closeHandler
}): JSX.Element => {
  const classes = useStyles()

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeHandler}
      PaperProps={{
        classes: {
          root: classes.sideMenuBg
        }
      }}>
      <NavButtonSet
        color="theme.palette.grey[500]"
        direction="column"
        justification="flex-start"
        alignment="flex-start"
      />
      <img src={NcaLogoGrey} className={classes.logo} />
    </Drawer>
  )
}
