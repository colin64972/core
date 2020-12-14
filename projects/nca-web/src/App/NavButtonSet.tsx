import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import HomeIcon from '@material-ui/icons/Home'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import React from 'react'
import { useSelector } from 'react-redux'
import { ResponsiveAngle } from './ResponsiveAngle'

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
      marginTop: theme.custom.setSpace('md'),
      [theme.breakpoints.only('sm')]: {
        ...theme.custom.setFlex()
      },
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        paddingLeft: 20
      }
    },
    midNavLink: {
      'width': '100%',
      'margin': `0`,
      'transition': 'all 250ms ease-out',
      '&:last-child': {
        margin: 0
      },
      [theme.breakpoints.only('sm')]: {
        margin: `0 ${theme.custom.setSpace('sm')}px 0 0`
      },
      [theme.breakpoints.up('lg')]: {
        'filter': 'drop-shadow(0.25rem 0.5rem  0.5rem rgba(0, 0, 0, 0.5))',
        '&:hover': {
          filter: 'unset'
        }
      }
    },
    midNavSpan: {
      ...theme.custom.setFlex(),
      ...theme.typography.shareTechMono,
      'color': theme.palette.grey[400],
      'textTransform': 'uppercase',
      'textAlign': 'center',
      'fontSize': theme.typography.fontSize * 1.25,
      'backgroundColor': theme.palette.grey[800],
      'height': theme.custom.setSpace('md'),
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: 'white'
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

  const mobileSize = useMediaQuery('(max-width: 768px)')

  const smSize = useMediaQuery('(min-width: 600px) and (max-width: 959px)')

  if (!navItems) return null

  const items = navItems.slice(slice)

  if (midNav)
    return (
      <Grid className={classes.midNavContainer}>
        {items.map((item, index) => (
          <a
            key={`mid-nav-${item.key}`}
            className={classes.midNavLink}
            href={item.to}>
            {!smSize && (
              <ResponsiveAngle
                fill="theme.palette.grey[800]"
                right={index % 2 === 0}
              />
            )}
            <span className={classes.midNavSpan}>
              {iconMap[item.icon]}
              &ensp;{item.label}
            </span>
            {!smSize && (
              <ResponsiveAngle
                fill="theme.palette.grey[800]"
                down
                right={index % 2 === 0}
              />
            )}
          </a>
        ))}
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
          <FadeIn direction="x" position={mobileSize ? 100 : -100}>
            {iconMap[item.icon]}
            &emsp;
            {item.label}
          </FadeIn>
        </Button>
      ))}
    </Grid>
  )
}
