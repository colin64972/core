import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { skillCategory } from '../constants'

const useStyles = makeStyles(
  theme => ({
    container: {
      'marginBottom': theme.custom.setSpace('sm'),
      '&:last-child': {
        marginBottom: 0
      }
    },
    label: {
      marginBottom: theme.custom.setSpace() / 2
    },
    baseBar: {
      width: '100%',
      height: 5,
      position: 'relative',
      backgroundColor: theme.palette.grey[300]
    },
    levelBar: {
      width: ({ levelWidth }) => `${levelWidth}%`,
      height: 5,
      position: 'absolute',
      zIndex: 5,
      backgroundColor: ({ bgColor }) =>
        bgColor.includes('rgb') ? bgColor : eval(bgColor)
    }
  }),
  {
    name: 'SkillGraph'
  }
)

interface Props {
  label: string
  level: number
  category: number
}

export const SkillGraph: React.FC<Props> = ({
  label,
  level,
  category
}): JSX.Element => {
  const classes = useStyles({
    levelWidth: level * 10,
    bgColor: setLevelBarColor()
  })

  function setLevelBarColor() {
    switch (category) {
      case skillCategory.front:
        return 'rgb(140, 237, 28)'
      case skillCategory.back:
        return 'rgb(28, 237, 230)'
      case skillCategory.tool:
        return 'rgb(126, 28, 237)'
      case skillCategory.aws:
        return 'rgb(255, 194, 0)'
      case skillCategory.design:
        return 'theme.palette.grey[900]'
      case skillCategory.marketing:
        return 'rgb(243, 17, 247)'
      default:
        return 'theme.palette.primary.main'
    }
  }

  return (
    <Grid className={classes.container}>
      <Typography variant="h6" className={classes.label}>
        {label}
      </Typography>
      <Grid className={classes.baseBar}>
        <Grid className={classes.levelBar} />
      </Grid>
    </Grid>
  )
}
