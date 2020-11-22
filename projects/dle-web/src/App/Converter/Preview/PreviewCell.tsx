import { setTransformStyle } from '@cjo3/shared/logic/dle'
import { TableCell, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { TransformResultCell } from '../../../store/converter/interfaces'

const useStyles = makeStyles(theme => ({
  PreviewCell_base: {
    ...theme.custom.tableBorder,
    ...theme.custom.noSelect,
    padding: theme.custom.setSpace(),
    margin: 0,
    textAlign: 'center'
  },
  PreviewCell_ul: {
    backgroundColor: theme.palette.primary[100]
  },
  PreviewCell_ol: {
    backgroundColor: theme.palette.secondary[100]
  },
  PreviewCell_zero: {
    backgroundColor: theme.palette.grey[300]
  },
  PreviewCell_tooltip: {
    fontSize: theme.typography.fontSize
  },
  PreviewCell_valueBg: {
    ...theme.custom.noSelect,
    ...theme.custom.valueImage,
    'width': ({ transformWidth }) => transformWidth,
    'height': ({ transformHeight }) => transformHeight,
    'backgroundImage': ({ transformUrl }) => transformUrl,
    'transition': 'all 250ms ease-out',
    '&:hover': {
      backgroundImage: ({ originalUrl }) => `url(${originalUrl})`,
      width: ({ originalWidth }) => originalWidth,
      height: ({ originalHeight }) => originalHeight,
      backgroundColor: theme.palette.pass[300],
      cursor: 'pointer'
    }
  }
}))

interface Props {
  transform: TransformResultCell
  cellAddress: string
  unprocessedData: string | number | boolean | null
  dataUrls: string[] | null
}

export const PreviewCell: React.FC<Props> = ({
  transform,
  cellAddress,
  unprocessedData,
  dataUrls
}): JSX.Element => {
  if (transform && dataUrls) {
    const tStyle = setTransformStyle(dataUrls.transform)
    const classes = useStyles({
      originalUrl: dataUrls.original.url,
      originalWidth: dataUrls.original.width,
      originalHeight: dataUrls.original.height,
      transformWidth: tStyle.width,
      transformHeight: tStyle.height,
      transformUrl: tStyle.backgroundImage
    })

    return (
      <Tooltip
        title={cellAddress}
        placement="right"
        arrow
        classes={{
          tooltip: classes.PreviewCell_tooltip
        }}>
        <TableCell
          id={cellAddress}
          align="center"
          className={clsx(
            classes.PreviewCell_base,
            classes.PreviewCell_valueBg,
            {
              [classes.PreviewCell_ul]: transform.meta.caseType === 'ul',
              [classes.PreviewCell_ol]: transform.meta.caseType === 'ol',
              [classes.PreviewCell_zero]: transform.meta.caseType === 'zero'
            }
          )}
        />
      </Tooltip>
    )
  }
  const classes = useStyles()

  return (
    <TableCell align="center" className={classes.PreviewCell_base}>
      {unprocessedData && unprocessedData.toString()}
    </TableCell>
  )
}
