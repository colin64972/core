import { TableCell, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { TransformResultCell } from '../../../../store/editor/interfaces'
import { setTransformStyle } from '@cjo3/shared/logic/dlc'

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
  const classes = useStyles()

  if (transform && dataUrls) {
    const dynamicStyles = makeStyles(theme => ({
      valueBg: {
        ...setTransformStyle(dataUrls.transform),
        'transition': 'all 250ms ease-out',
        '&:hover': {
          backgroundImage: `url(${dataUrls.original.url})`,
          width: dataUrls.original.width,
          height: dataUrls.original.height,
          backgroundColor: theme.palette.pass[300],
          cursor: 'pointer'
        }
      }
    }))

    const dynamicClasses = dynamicStyles()

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
          className={clsx(classes.PreviewCell_base, dynamicClasses.valueBg, {
            [classes.PreviewCell_ul]: transform.meta.caseType === 'ul',
            [classes.PreviewCell_ol]: transform.meta.caseType === 'ol',
            [classes.PreviewCell_zero]: transform.meta.caseType === 'zero'
          })}
        />
      </Tooltip>
    )
  }

  return (
    <TableCell align="center" className={classes.PreviewCell_base}>
      {unprocessedData && unprocessedData.toString()}
    </TableCell>
  )
}
