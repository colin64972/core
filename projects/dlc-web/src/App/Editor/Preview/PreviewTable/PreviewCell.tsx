import { TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { TransformResultCell } from '../../../../store/editor/interfaces'

const useStyles = makeStyles(theme => ({}))

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

  const dispatch = useDispatch()

  if (transform)
    return (
      <TableCell id={cellAddress} align="center">
        {transform.result.w}
      </TableCell>
    )
  return <TableCell align="center">{unprocessedData.toString()}</TableCell>
}
