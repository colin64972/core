import NcaLogoWhite from '@cjo3/shared/assets/svgs/nca-logo-white'
import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { AngleBand } from './AngleBand'
import { ContentContainer } from './ContentContainer'
import { NavButtonSet } from './NavButtonSet'
import { SideMenu } from './SideMenu'

const useStyles = makeStyles(
  theme => ({
    logo: {
      cursor: 'pointer',
      height: theme.custom.setSpace('sm')
    },
    sideMenuIcon: {
      color: 'white',
      width: theme.custom.setSpace('sm'),
      cursor: 'pointer',
      display: 'inline-block',
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    navButtonSet: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'inline-block'
      }
    }
  }),
  {
    name: 'TopNav'
  }
)

export const TopNav: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false)

  const openSideMenuHandler = (): void => {
    setSideMenuOpen(true)
  }

  const closeSideMenuHandler = (): void => {
    setSideMenuOpen(false)
  }

  const logoClickHandler = (): void => {
    clickWindowLink('/')
  }

  return (
    <Grid container>
      <ContentContainer bgColor="theme.palette.primary.main">
        <Grid container justify="space-between" alignItems="center">
          <img
            src={NcaLogoWhite}
            className={classes.logo}
            onClick={logoClickHandler}
          />
          <MenuIcon
            className={classes.sideMenuIcon}
            onClick={openSideMenuHandler}
          />
          <div className={classes.navButtonSet}>
            <NavButtonSet
              slice={1}
              color="theme.palette.primary[100]"
              direction="row"
              justification="flex-end"
              alignment="center"
            />
          </div>
        </Grid>
        {sideMenuOpen && (
          <SideMenu open={sideMenuOpen} closeHandler={closeSideMenuHandler} />
        )}
      </ContentContainer>
      <AngleBand right down fill="theme.palette.primary.main" />
    </Grid>
  )
}
