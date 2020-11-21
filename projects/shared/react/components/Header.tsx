import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FadeIn } from './FadeIn'

interface Props {
  title: string
  titleColor?: string
  subTitle?: string
  subTitleColor?: string
  bgColor?: string
  bgUrl?: string
  buttonHref?: string
  buttonLabel?: string
}

export const Header: React.FC<Props> = ({
  title,
  titleColor = 'theme.palette.grey[50]',
  subTitle,
  subTitleColor = 'theme.palette.grey[300]',
  bgColor,
  bgUrl,
  buttonHref,
  buttonLabel
}): JSX.Element => {
  const useStyles = makeStyles(theme => ({
    Header_containerBg: {
      backgroundColor: eval(bgColor),
      backgroundImage: `url(${bgUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    Header_contentContainer: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      height: 300,
      padding: theme.custom.setSpace('sm')
    },
    Header_title: {
      color: eval(titleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow
    },
    Header_subTitle: {
      color: eval(subTitleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow,
      fontWeight: 'normal'
    },
    Header_button: {
      marginTop: theme.custom.setSpace('sm')
    }
  }))

  const classes = useStyles()

  return (
    <Grid
      component="header"
      container
      justify="center"
      alignItems="center"
      className={classes.Header_containerBg}>
      <Grid className={classes.Header_contentContainer}>
        <FadeIn direction="x" position={100}>
          <Typography
            variant="h1"
            align="center"
            className={classes.Header_title}>
            {title}
          </Typography>
        </FadeIn>
        {subTitle && (
          <FadeIn direction="x" position={100}>
            <Typography
              variant="h4"
              align="center"
              className={classes.Header_subTitle}>
              {subTitle}
            </Typography>
          </FadeIn>
        )}
        {buttonHref && (
          <FadeIn direction="x" position={100}>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              className={classes.Header_button}
              href={switchLinkRoutePath(
                buttonHref,
                `${process.env.APP_ROOT_PATH}/${buttonHref}`
              )}>
              {buttonLabel}
            </Button>
          </FadeIn>
        )}
      </Grid>
    </Grid>
  )
}
