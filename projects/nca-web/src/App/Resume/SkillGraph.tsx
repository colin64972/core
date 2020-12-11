import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { skillCategories, barColors } from '@cjo3/shared/raw/constants/nca'

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
      case skillCategories.indexOf('front'):
        return barColors.green
      case skillCategories.indexOf('back'):
        return barColors.cyan
      case skillCategories.indexOf('tool'):
        return barColors.purple
      case skillCategories.indexOf('aws'):
        return barColors.yellow
      case skillCategories.indexOf('design'):
        return 'theme.palette.grey[900]'
      case skillCategories.indexOf('marketing'):
        return barColors.pink
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
