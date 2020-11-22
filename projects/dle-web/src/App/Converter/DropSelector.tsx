import { makeStyles } from '@material-ui/core/styles'
import GetAppIcon from '@material-ui/icons/GetApp'
import clsx from 'clsx'
import path from 'path'
import React, { useState } from 'react'
import { FileUpload } from '../../interfaces'

const useStyles = makeStyles(
  theme => ({
    DropSelector_dropZone: {
      ...theme.custom.setFlex('column'),
      width: '100%',
      height: '100%',
      borderRadius: theme.custom.setSpace() / 4,
      backgroundColor: theme.palette.primary.main,
      transition: 'all 250ms linear'
    },
    DropSelector_dragColor: {
      boxShadow: theme.custom.boxShadow
    },
    DropSelector_dropIcon: {
      color: theme.palette.primary[50],
      fontSize: `${theme.custom.setSpace('lg')}px !important`
    }
  }),
  {
    name: 'DropSelector'
  }
)

interface Props {
  setSelectedFileHandler: (file: FileUpload) => void
}

export const DropSelector: React.FC<Props> = ({
  setSelectedFileHandler
}): JSX.Element => {
  const classes = useStyles()

  const [dragCount, setDragCount] = useState<number>(0)

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setDragCount(dragCount + 1)
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setDragCount(dragCount - 1)
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const item = event.dataTransfer.items[0]
    if (item.kind === 'file') {
      const file = item.getAsFile()
      const fileExt = path.extname(file.name).toLowerCase()
      if (process.env.ACCEPTED_FILETYPES.split(',').includes(fileExt))
        setSelectedFileHandler(file)
    }
    setDragCount(0)
  }

  return (
    <div
      data-testid="DropSelector"
      className={clsx(classes.DropSelector_dropZone, {
        [classes.DropSelector_dragColor]: dragCount > 0
      })}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}>
      <GetAppIcon className={classes.DropSelector_dropIcon} />
    </div>
  )
}
