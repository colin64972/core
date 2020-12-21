import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    cssContainer: {
      width: '100%',
      height: ({ height }) => height,
      display: 'flex',
      justifyContent: ({ right }) => (right ? 'flex-end' : 'flex-start'),
      alignItems: ({ down }) => (down ? 'flex-start' : 'flex-end')
    },
    cssAngle: {
      'width': '100%',
      'height': ({ height }) => height,
      'backgroundColor': ({ fill }) => eval(fill),
      'transform': ({ x, y }) => `scaleX(${x}) scaleY(${y})`,
      'clipPath': 'polygon(0 0, 100% 100%, 0% 100%)',
      '-webkit-clipPath': 'polygon(0 0, 100% 100%, 0% 100%)'
    }
  }),
  { name: 'CssAngle' }
)

interface Props {
  fill?: string
  height?: number
  right?: boolean
  down?: boolean
  customClass?: string
}

export const CssAngle: React.FC<Props> = ({
  fill = 'theme.palette.grey[200]',
  height = 30,
  right = false,
  down = false,
  customClass
}): JSX.Element => {
  const classes = useStyles({
    fill,
    height,
    x: right ? -1 : 1,
    y: down ? -1 : 1
  })

  return (
    <div className={clsx(classes.cssContainer, customClass)}>
      <div className={classes.cssAngle} />
    </div>
  )
}
