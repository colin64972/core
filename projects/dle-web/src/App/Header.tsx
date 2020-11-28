import { switchLinkRoutePath, createHashId } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import modernizr from 'modernizr'
import { JPG_FILE_EXT } from '@cjo3/shared/raw/constants/regex'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'

const useStyles = makeStyles(
  theme => ({
    Header_containerBg: {
      backgroundColor: ({ bgColor }) => bgColor,
      position: 'relative',
      height: 300,
      overflow: 'hidden'
    },
    Header_bgImage: {
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
  const [webpOk, setWebpOk] = useState<boolean>(false)
  const [bgUrl, setBgUrl] = useState<string>('')

  if (!process.env.IS_SEVER) {
    useLayoutEffect(() => {
      chooseBgSize(window.innerWidth)
      checkWebpOk()
    })
  }

  const checkWebpOk = async () => {
    let result = false
    if (modernizr.webp) result = true
    return setWebpOk(result)
  }

  const chooseBgSize = width => {
    if (width >= 1920) return setSizeIndex(4)
    if (width >= 1280) return setSizeIndex(3)
    if (width >= 960) return setSizeIndex(2)
    if (width >= 600) return setSizeIndex(1)
    return setSizeIndex(0)
  }

  const resizeHandler = event => {
    const { innerWidth } = window
    chooseBgSize(innerWidth)
  }

  if (!process.env.IS_SEVER) {
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
