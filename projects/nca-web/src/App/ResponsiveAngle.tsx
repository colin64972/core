import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useState, useLayoutEffect, useRef } from 'react'

const useStyles = makeStyles(
  theme => ({
    container: {
      width: '100%',
      height: ({ height }) => height,
      display: 'flex',
      justifyContent: ({ right }) => (right ? 'flex-end' : 'flex-start'),
      alignItems: ({ down }) => (down ? 'flex-start' : 'flex-end')
    },
    svg: {
      width: '100%',
      height: ({ height }) => height,
      transform: ({ x, y }) => `scaleX(${x}) scaleY(${y})`
    },
    polygon: {
      width: '100%',
      height: ({ height }) => height,
      fill: ({ fill }) => (fill.includes('theme') ? eval(fill) : fill)
    }
  }),
  { name: 'ResponsiveAngle' }
)

interface Props {
  fill?: string
  height?: number
  right?: boolean
  down?: boolean
  customClass?: string
}

export const ResponsiveAngle: React.FC<Props> = ({
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

  const container = useRef<HTMLDivElement>(null)

  const [viewWidth, updateViewWidth] = useState<number | null>(null)
  const [containerWidth, updateContainerWidth] = useState<number>(0)

  const resizeHandler = (): void => {
    updateViewWidth(window.innerWidth)
  }

  useLayoutEffect(() => {
    if (!process.env.IS_SERVER) {
      updateViewWidth(window.innerWidth)
      window.addEventListener('resize', resizeHandler)
    }
    return () => window.removeEventListener('resize', resizeHandler)
  })

  useLayoutEffect(() => {
    if (container) {
      updateContainerWidth(container.current.offsetWidth)
    }
  }, [viewWidth])

  return (
    <div ref={container} className={clsx(classes.container, customClass)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${containerWidth} ${height}`}
        className={classes.svg}>
        <polygon
          points={`0 0 0 ${height} ${containerWidth} ${height}`}
          className={classes.polygon}
        />
      </svg>
    </div>
  )
}
