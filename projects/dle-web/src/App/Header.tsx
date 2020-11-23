import { switchLinkRoutePath, createHashId } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    Header_containerBg: {
      backgroundColor: ({ bgColor }) => eval(bgColor),
      backgroundImage: ({ bgUrls }) => `url(${bgUrls[0]})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      [theme.breakpoints.up('sm')]: {
        backgroundImage: ({ bgUrls }) => `url(${bgUrls[1]})`
      },
      [theme.breakpoints.up('md')]: {
        backgroundImage: ({ bgUrls }) => `url(${bgUrls[2]})`
      },
      [theme.breakpoints.up('lg')]: {
        backgroundImage: ({ bgUrls }) => `url(${bgUrls[3]})`
      },
      [theme.breakpoints.up('xl')]: {
        backgroundImage: ({ bgUrls }) => `url(${bgUrls[4]})`
      }
    },
    Header_contentContainer: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      height: 300,
      padding: theme.custom.setSpace('sm')
    },
    Header_title: {
      color: ({ titleColor }) => eval(titleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow
    },
    Header_subTitle: {
      color: ({ subTitleColor }) => eval(subTitleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow,
      fontWeight: 'normal'
    },
    Header_button: {
      marginTop: theme.custom.setSpace('sm')
    }
  }),
  {
    name: `Header-${createHashId()}`
  }
)

interface Props {
  title: string
  titleColor?: string
  subTitle?: string
  subTitleColor?: string
  bgColor?: string
  bgUrls?: string[]
  buttonHref?: string
  buttonLabel?: string
}

export const Header: React.FC<Props> = ({
  title,
  titleColor = 'theme.palette.grey[50]',
  subTitle,
  subTitleColor = 'theme.palette.grey[300]',
  bgColor,
  bgUrls,
  buttonHref,
  buttonLabel
}): JSX.Element => {
  const classes = useStyles({
    titleColor,
    subTitleColor,
    bgColor,
    bgUrls
  })

  return (
    <Grid
      component="header"
      container
      justify="center"
      alignItems="center"
      className={classes.Header_containerBg}>
      <Grid className={classes.Header_contentContainer}>
        <Typography
          variant="h1"
          align="center"
          className={classes.Header_title}>
          {title}
        </Typography>
        {subTitle && (
          <Typography
            variant="h4"
            align="center"
            className={classes.Header_subTitle}>
            {subTitle}
          </Typography>
        )}
        {buttonHref && (
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className={classes.Header_button}
            href={switchLinkRoutePath(buttonHref)}>
            {buttonLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
