import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setHtml } from '@cjo3/shared/react/helpers'
import React from 'react'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

const useStyles = makeStyles(
  theme => ({
    container: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace(
        'sm'
      )}px`,
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row')
      }
    },
    image: {
      maxWidth: 260,
      [theme.breakpoints.up('sm')]: {
        height: 260
      }
    },
    tagline: {
      display: 'inline-block',
      ...theme.typography.shareTechMono,
      textTransform: 'uppercase',
      fontSize: theme.typography.fontSize * 3,
      textAlign: 'center',
      letterSpacing: -2,
      color: 'white',
      textShadow: `0 0 3px ${theme.palette.primary.main}`,
      margin: `${theme.custom.setSpace('sm')}px 0 0 0`,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
        margin: `0 0 0 ${theme.custom.setSpace('sm')}px`,
        fontSize: theme.typography.fontSize * 4
      }
    }
  }),
  {
    name: 'HeroBar'
  }
)

interface Props {
  src: string
  tagline: string
  alt: string
}

export const HeroBar: React.FC<Props> = ({
  src,
  tagline,
  alt
}): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <FadeIn direction="x" position={-100}>
        <img src={src} className={classes.image} alt={alt} />
      </FadeIn>
      <FadeIn direction="x" position={100}>
        <Typography
          variant="h1"
          className={classes.tagline}
          dangerouslySetInnerHTML={setHtml(tagline)}
        />
      </FadeIn>
    </Grid>
  )
}
