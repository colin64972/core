import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ResumeEntry as IResumeEntry } from '../../../index'

const useStyles = makeStyles(
  theme => ({
    entry: {
      'margin': `0 0 ${theme.custom.setSpace('sm')}px 0`,
      '&:last-child': {
        margin: 0
      }
    },
    image: {
      margin: ({ work }) =>
        work
          ? `0 ${theme.custom.setSpace()}px 0 0`
          : `0 ${theme.custom.setSpace()}px ${theme.custom.setSpace()}px 0`,
      backgroundColor: ({ work }) => !work && 'white',
      borderRadius: ({ work }) => !work && 5,
      [theme.breakpoints.up('sm')]: {
        margin: `0 ${theme.custom.setSpace()}px 0 0`
      }
    },
    text: {
      maxWidth: 500
    },
    title: {
      color: ({ work }) => (work ? theme.palette.primary.main : 'white'),
      margin: 0
    },
    subtitle: {
      color: ({ work }) => (work ? 'black' : 'white'),
      margin: 0
    },
    period: {
      margin: 0,
      color: ({ work }) =>
        work ? theme.palette.grey[700] : theme.palette.primary[100]
    },
    bulletList: {
      marginTop: theme.custom.setSpace(),
      paddingLeft: theme.custom.setSpace()
    }
  }),
  {
    name: 'ResumeEntry'
  }
)

interface Props extends IResumeEntry {
  work?: boolean
}

export const ResumeEntry: React.FC<Props> = ({
  title,
  subtitle,
  period,
  bullets,
  logo,
  work
}): JSX.Element => {
  const classes = useStyles({
    work
  })
  return (
    <Grid className={classes.entry}>
      <Grid container justify="flex-start" alignItems="center">
        <ImageHandler asset={logo} pictureClass={classes.image} />
        <Grid>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {subtitle}
          </Typography>
          <Typography variant="body1" className={classes.period}>
            {period}
          </Typography>
        </Grid>
      </Grid>
      {bullets && (
        <ul className={classes.bulletList}>
          {bullets.map(item => (
            <li key={item.key}>{item.label}</li>
          ))}
        </ul>
      )}
    </Grid>
  )
}
