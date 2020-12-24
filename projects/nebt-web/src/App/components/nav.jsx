import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import DropDownMenu from './dropDownMenu'
import routes from '../routes'
import { selectUserAccount } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  appBar: {
    padding: `0 ${theme.custom.setSpace()}px`,
    borderRadius: 0
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  menuLogo: {
    ...theme.custom.flexRowCentered
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      top: 4,
      display: 'unset',
      margin: 0,
      color: theme.palette.common.black,
      lineHeight: 1
    }
  },
  userAccount: {
    'fontSize': theme.custom.setSpace(),
    'color': theme.palette.common.black,
    'transition': theme.custom.transitions.color,
    'position': 'relative',
    'top': 2,
    '&:hover': {
      color: theme.palette.grey[700]
    }
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const userAccount = useSelector(state => selectUserAccount(state))
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar disableGutters component="nav" className={classes.toolbar}>
        <div className={classes.menuLogo}>
          <DropDownMenu menuItems={props.menuItems} />
          <Link href={routes[0].path} underline="none">
            <Typography variant="h6" className={classes.title}>
              {process.env.APP_NAME}
            </Typography>
          </Link>
        </div>
        {userAccount && (
          <div>
            <Link
              href={`https://etherscan.io/address/${userAccount}`}
              underline="none"
              target="_blank"
              rel="noopener noreferrer">
              <Typography variant="body1" className={classes.userAccount}>
                {userAccount.substr(0, 6)}&hellip;{userAccount.substr(-4)}
              </Typography>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
