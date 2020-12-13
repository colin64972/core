import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import HomeIcon from '@material-ui/icons/Home'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Angle } from './Angle'
import React from 'react'

interface Props {
  slice?: number
  color: string
  direction?: string
  justification?: string
  alignment?: string
  midNav?: boolean
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
      ...theme.typography.shareTechMono,
      'color': eval(color),
      'transition': 'color 250ms ease-out',
      'margin':
        direction === 'row'
          ? `0 ${theme.custom.setSpace() / 2}px 0 0`
          : `0 0 ${theme.custom.setSpace() / 2}px 0`,
      '&:hover': {
        color: 'white'
      },
      '&:last-child': {
        margin: 0
      }
    }),
    midNavContainer: {
      ...theme.custom.setFlex('column'),
      margin: `${theme.custom.setSpace(
        'md'
      )}px 0 ${theme.custom.setSpace()}px 0`,
      [theme.breakpoints.only('sm')]: {
        ...theme.custom.setFlex('row')
      }
    },
    midNavLink: {
      maxWidth: 260,
      transition: 'all 250ms ease-out',
      [theme.breakpoints.only('sm')]: {
        'maxWidth': 160,
        'margin': `0 ${theme.custom.setSpace('sm')}px 0 0`,
        '&:last-child': {
          margin: 0
        }
      },
      [theme.breakpoints.up('md')]: {
        'filter': 'drop-shadow(0.5rem 0.5rem  0.5rem rgba(0, 0, 0, 0.33))',
        'maxWidth': 300,
        '&:hover': {
          filter: 'unset'
        }
      }
    },
    midNavSpan: {
      ...theme.custom.setFlex(),
      ...theme.typography.shareTechMono,
      'maxWidth': 260,
      'margin': '-1px 0',
      'textTransform': 'uppercase',
      'height': theme.custom.setSpace('md'),
      'color': theme.palette.grey[400],
      'textAlign': 'center',
      'fontSize': theme.typography.fontSize * 1.5,
      'backgroundColor': theme.palette.grey[800],
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: 'white',
        cursor: 'pointer'
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: 160
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 300,
        margin: 0
      }
    }
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
  midNav
}): JSX.Element | null => {
  const classes = useStyles({
    color,
    direction,
    justification,
    alignment
  })

  const navItems = useSelector(state => state.content.navItems)

  const menuItemClickHandler = (linkTo: string) => (
    event: React.MouseEvent
  ): void => {
    clickWindowLink(linkTo)
  }

  if (!navItems) return null

  const items = navItems.slice(slice)

  if (midNav)
    return (
      <Grid className={classes.midNavContainer}>
        {items.map((item, index) => {
          const x = index % 2 === 0 ? '-1' : '1'
          const float = index % 2 === 0 ? 'right' : 'left'
          return (
            <a
              href={item.to}
              className={classes.midNavLink}
              key={`mid-nav-${item.key}`}>
              <Angle color="grey800" x={x} y="1" float={float} />
              <span className={clsx(classes.midNavSpan)}>
                {iconMap[item.icon]}
                &ensp;{item.label}
              </span>
              <Angle color="grey800" x={x} y="-1" float={float} />
            </a>
          )
        })}
      </Grid>
    )
  return (
    <Grid className={classes.container}>
      {items.map(item => (
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
