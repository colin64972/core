import { TableCell } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { TransformResultCell } from '../../../../store/editor/interfaces'

const useStyles = makeStyles(theme => ({
  PreviewCell_base: {
    ...theme.custom.tableBorder,
    ...theme.custom.noSelect,
    padding: theme.custom.setSpace(),
    margin: 0,
    textAlign: 'center'
  },
  PreviewCell_ul: {
    backgroundColor: theme.palette.primary[50]
  },
  PreviewCell_ol: {
    backgroundColor: theme.palette.secondary[50]
  },
  PreviewCell_zero: {
    backgroundColor: theme.palette.grey[200]
  }
}))

interface Props {
  transform: TransformResultCell
  cellAddress: string
  unprocessedData: string | number | boolean | null
}

export const PreviewCell: React.FC<Props> = ({
  transform,
  cellAddress,
  unprocessedData
}): JSX.Element => {
  const classes = useStyles()

  if (transform)
    return (
      <TableCell
        id={cellAddress}
        align="center"
        className={clsx(classes.PreviewCell_base, {
          [classes.PreviewCell_ul]: transform.transformKind === 'ul',
          [classes.PreviewCell_ol]: transform.transformKind === 'ol',
          [classes.PreviewCell_zero]: transform.transformKind === 'zero'
        })}>
        {transform.result.w}
      </TableCell>
    )
  return (
    <TableCell align="center" className={classes.PreviewCell_base}>
      {unprocessedData && unprocessedData.toString()}
    </TableCell>
  )
}
