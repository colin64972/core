import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import angleRed from '@cjo3/shared/assets/svgs/angle-red'
import angleGrey900 from '@cjo3/shared/assets/svgs/angle-grey900'
import angleGrey800 from '@cjo3/shared/assets/svgs/angle-grey800'
import angleGrey200 from '@cjo3/shared/assets/svgs/angle-grey200'

const useStyles = makeStyles(
  theme => ({
    div: {
      // border: '1px solid blue',
      width: '100%',
      display: 'flex',
      justifyContent: ({ float }) =>
        float === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      overflow: 'hidden',
      [theme.breakpoints.only('sm')]: {
        display: ({ hide }) => hide === 'sm' && 'none'
      }
    },
    img: {
      // border: '1px solid orange',
      height: 30,
      transform: ({ x, y }) => `scaleX(${x}) scaleY(${y})`,
      float: ({ float }) => float
    }
  }),
  { name: 'Angle' }
)

interface Props {
  color: string
  x: string
  y: string
  float: string
  hide?: TemplateStringsArray
}

export const Angle: React.FC<Props> = ({
  color,
  x,
  y,
  float,
  hide
}): JSX.Element => {
  const classes = useStyles({
    x,
    y,
    float,
    hide
  })

  const srcMap: { [key: string]: string } = {
    grey200: angleGrey200,
    grey800: angleGrey800,
    grey900: angleGrey900,
    red: angleRed
  }

  return (
    <div className={classes.div}>
      <img src={srcMap[color]} className={classes.img} />
    </div>
  )
}
