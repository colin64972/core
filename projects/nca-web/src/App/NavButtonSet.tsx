import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import HomeIcon from '@material-ui/icons/Home'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import React from 'react'
import { menuItems } from './constants'

interface Props {
  slice?: number
  color: string
  direction: string
  justification: string
  alignment: string
  noLastChildMargin: boolean
}

const useStyles = makeStyles(
  theme => ({
    container: ({ direction, justification, alignment }) => ({
      ...theme.custom.setFlex(direction, justification, alignment)
    }),
    buttonRoot: {
      padding: theme.custom.setSpace() / 2
    },
    menuItem: ({ direction, color }) => ({
      'fontFamily': 'Share Tech Mono, ' + theme.typography.fontFamily,
      'fontSize': theme.typography.fontSize,
      'color': eval(color),
      'transition': 'color 250ms ease-out',
      'margin':
        direction === 'row'
          ? `0 ${theme.custom.setSpace() / 2}px 0 0`
          : `0 0 ${theme.custom.setSpace() / 2}px 0`,
      '&:hover': {
        color: 'white'
      },
      '&:last-child': ({ noLastChildMargin }) => ({
        margin: noLastChildMargin ? 0 : ''
      })
    })
  }),
  {
    name: 'NavButtonSet'
  }
)

const iconMap: { [key: string]: JSX.Element } = {
  home: <HomeIcon />,
  resume: <BusinessCenterIcon />,
  apps: <ImportantDevicesIcon />,
  contact: <MailOutlineIcon />
}

export const NavButtonSet: React.FC<Props> = ({
  slice,
  color,
  direction,
  justification,
  alignment,
  noLastChildMargin
}): JSX.Element => {
  const classes = useStyles({
    color,
    direction,
    justification,
    alignment,
    noLastChildMargin
  })
  const menuItemClickHandler = (linkTo: string) => (
    event: React.MouseEvent
  ): void => {
    clickWindowLink(linkTo)
  }
  return (
    <Grid className={classes.container}>
      {menuItems.slice(slice).map(item => (
        <Button
          key={item.key}
          type="button"
          onClick={menuItemClickHandler(item.to)}
          className={classes.menuItem}
          classes={{ root: classes.buttonRoot }}>
          {iconMap[item.icon]}
          &emsp;
          {item.label}
        </Button>
      ))}
    </Grid>
  )
}
