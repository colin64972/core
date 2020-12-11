import NcaLogoWhite from '@cjo3/shared/assets/svgs/nca-logo-white'
import { Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { AngleBand } from './AngleBand'
import { ContentContainer } from './ContentContainer'
import { NavButtonSet } from './NavButtonSet'
import { SideMenu } from './SideMenu'
import { clickWindowLink } from '@cjo3/shared/react/helpers'

const useStyles = makeStyles(
  theme => ({
    logo: {
      cursor: 'pointer',
      height: theme.custom.setSpace('sm')
    },
    sideMenuIcon: {
      color: 'white',
      width: theme.custom.setSpace('sm'),
      cursor: 'pointer'
    }
  }),
  {
    name: 'TopNav'
  }
)

export const TopNav: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false)

  const matches = useMediaQuery('(max-width: 599px)')

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
          {matches ? (
            <MenuIcon
              className={classes.sideMenuIcon}
              onClick={openSideMenuHandler}
            />
          ) : (
            <NavButtonSet
              slice={1}
              color="theme.palette.primary[100]"
              direction="row"
              justification="flex-end"
              alignment="center"
              noLastChildMargin
            />
          )}
        </Grid>
        {matches && sideMenuOpen && (
          <SideMenu open={sideMenuOpen} closeHandler={closeSideMenuHandler} />
        )}
      </ContentContainer>
      <AngleBand bottom right bgColor="theme.palette.primary.main" />
    </Grid>
  )
}
