import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import { responsivePadding } from '../../theme'

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.gradients.black
  },
  item: {
    ...theme.custom.flexRowCentered,
    justifyContent: 'space-around',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.custom.setSpace('md'),
      paddingBottom: theme.custom.setSpace('md')
    },
    [theme.breakpoints.down('sm')]: {
      ...responsivePadding(theme)(true),
      ...theme.custom.flexColumnCentered
    }
  },
  title: {
    margin: '0 !important',
    color: theme.palette.primary.main
  },
  copy: {
    color: theme.palette.grey[500],
    fontSize: theme.custom.setSpace() * 0.85,
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.custom.setSpace() * 0.75,
      textAlign: 'center'
    }
  },
  list: {
    ...theme.custom.ulNoStyle,
    ...theme.custom.flexRowCentered,
    [theme.breakpoints.down('sm')]: {
      ...theme.custom.flexColumnCentered
    }
  },
  listItem: {
    ...theme.custom.flexRowCentered
  },
  link: {
    'fontWeight': 'bold',
    'color': theme.palette.grey[300],
    'textAlign': 'center',
    'textTransform': 'uppercase',
    'transition': theme.custom.transitions.color,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  bold: {
    ...theme.typography.bold
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  return (
    <Grid container component="footer" className={classes.footer}>
      <Grid item xs={12} className={classes.item}>
        <Link href="/" underline="none">
          <Typography variant="h6" className={classes.title}>
            NEB Token
          </Typography>
        </Link>
        <List className={classes.list}>
          {props.menuItems.map(
            item =>
              item.showInMenus.includes('footer') && (
                <ListItem key={item.key} className={classes.listItem}>
                  <Link
                    href={item.path}
                    underline="none"
                    className={classes.link}>
                    {item.label}
                  </Link>
                </ListItem>
              )
          )}
        </List>
        <Typography variant="body1" className={classes.copy}>
          &copy; 2019
          <br />
          <span className={classes.bold}>NEB Token</span>
          <br />
          All Rights Reserved
        </Typography>
      </Grid>
    </Grid>
  )
}
