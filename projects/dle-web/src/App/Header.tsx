import { switchLinkRoutePath, createHashId } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { JPG_FILE_EXT } from '@cjo3/shared/raw/constants/regex'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { webpOkSelector, viewWidthSelector } from '../store/selectors'

const useStyles = makeStyles(
  theme => ({
    Header_containerBg: {
      backgroundColor: ({ bgColor }) => bgColor,
      position: 'relative',
      height: 300,
      overflow: 'hidden'
    },
    Header_bgImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 5
    },
    Header_contentContainer: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      height: 300,
      padding: theme.custom.setSpace('sm'),
      position: 'relative',
      zIndex: 10
    },
    Header_title: {
      color: ({ titleColor }) => eval(titleColor),
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
  title?: string
  titleColor?: string
  subTitle?: string
  subTitleColor?: string
  bgColor?: string
  bgUrls: string[]
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

  const [sizeIndex, setSizeIndex] = useState<number>(0)
  const [bgUrl, setBgUrl] = useState<string>(bgUrls[0])

  const webpOk = useSelector(webpOkSelector)

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      chooseBgSize(window.innerWidth)
    })
  }

  const chooseBgSize = width => {
    if (width >= 1920) return setSizeIndex(4)
    if (width >= 1280) return setSizeIndex(3)
    if (width >= 960) return setSizeIndex(2)
    if (width >= 600) return setSizeIndex(1)
    return setSizeIndex(0)
  }

  const resizeHandler = () => {
    const { innerWidth } = window
    chooseBgSize(innerWidth)
  }

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      window.addEventListener('resize', resizeHandler)
      return () => window.removeEventListener('resize', resizeHandler)
    })
  }

  useEffect(() => {
    if (webpOk)
      return setBgUrl(bgUrls[sizeIndex].replace(JPG_FILE_EXT, '.webp'))
    setBgUrl(bgUrls[sizeIndex])
  }, [sizeIndex])

  return (
    <Grid
      component="header"
      container
      justify="center"
      alignItems="center"
      className={classes.Header_containerBg}>
      <img src={bgUrl} className={classes.Header_bgImage} />
      <Grid className={classes.Header_contentContainer}>
        {title && (
          <Typography
            variant="h1"
            align="center"
            className={classes.Header_title}>
            {title}
          </Typography>
        )}
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
