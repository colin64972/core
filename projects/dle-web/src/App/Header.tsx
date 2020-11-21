import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

interface Props {
  name: string
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
  name,
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
    [`Header_${name}_containerBg`]: {
      backgroundColor: eval(bgColor),
      backgroundImage: `url(${bgUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    [`Header_${name}_contentContainer`]: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      height: 300,
      padding: theme.custom.setSpace('sm')
    },
    [`Header_${name}_title`]: {
      color: eval(titleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow
    },
    [`Header_${name}_subTitle`]: {
      color: eval(subTitleColor),
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow,
      fontWeight: 'normal'
    },
    [`Header_${name}_button`]: {
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
      className={classes[`Header_${name}_containerBg`]}>
      <Grid className={classes[`Header_${name}_contentContainer`]}>
        <FadeIn direction="x" position={100}>
          <Typography
            variant="h1"
            align="center"
            className={classes[`Header_${name}_title`]}>
            {title}
          </Typography>
        </FadeIn>
        {subTitle && (
          <FadeIn direction="x" position={100}>
            <Typography
              variant="h4"
              align="center"
              className={classes[`Header_${name}_subTitle`]}>
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
              className={classes[`Header_${name}_button`]}
              href={switchLinkRoutePath(buttonHref)}>
              {buttonLabel}
            </Button>
          </FadeIn>
        )}
      </Grid>
    </Grid>
  )
}
