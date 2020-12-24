import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.common.black
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  const [anchorElement, setAnchorElement] = useState()
  const handleClick = event => setAnchorElement(event.currentTarget)
  const handleClose = () => setAnchorElement(null)
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-controls="nav-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}>
        {props.menuItems.map(
          item =>
            item.showInMenus.includes('nav') && (
              <MenuItem onClick={handleClose} key={item.key}>
                <Link
                  href={item.path}
                  underline="none"
                  className={classes.link}>
                  {item.label}
                </Link>
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  )
}
