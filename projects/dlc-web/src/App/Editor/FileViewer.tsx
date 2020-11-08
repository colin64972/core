import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import XLSX from 'xlsx'
import { FileUpload } from '../../interfaces'

const useStyles = makeStyles(theme => ({
  unloadButton: {
    float: 'right'
  },
  fileDetails: {
    padding: theme.custom.setSpace(),
    background: `linear-gradient(163deg, ${theme.palette.primary.main}, ${theme.palette.primary[600]})`,
    ...theme.custom.radius
  },
  detailList: {
    marginTop: theme.custom.setSpace(),
    color: 'white'
  },
  processOptions: {
    padding: theme.custom.setSpace()
  },
  previewContainer: {
    padding: theme.custom.setSpace()
  },
  table: {
    borderCollapse: 'collapse',
    backgroundColor: theme.palette.grey[50]
  },
  tableRow: {
    // border: '1px solid red'
  },
  dataCell: {
    textAlign: 'center',
    border: '1px solid whitesmoke',
    padding: 1
  },
  lessThan: {
    backgroundColor: theme.palette.primary[50]
  },
  greaterThan: {
    backgroundColor: theme.palette.secondary[50]
  }
}))

interface Props {
  loadedFile: FileUpload
  unloadFileHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export const FileViewer: React.FC<Props> = ({
  loadedFile,
  unloadFileHandler
}): JSX.Element => {
  const classes = useStyles()

  const [workbook, setWorkbook] = useState(null)
  const [currentSheet, setCurrentSheet] = useState(null)

  useEffect(() => {
    readWorkbook(loadedFile)
  }, [loadedFile])

  const selectCurrentSheet = (event: React.MouseEvent): void => {
    setCurrentSheet(event.currentTarget.name)
  }

  if (!workbook) return null

  const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[currentSheet], {
    header: 1
  })

  console.log('%c sheetJson', 'color: yellow; font-size: large', sheetJson)

  return (
    <Grid item xs={12}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item xs={8}>
          <Typography variant="h3">File Viewer</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={unloadFileHandler}
            className={classes.unloadButton}>
            Unload File
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.fileDetails}>
          <Typography variant="h5">File Details</Typography>
          <List dense disablePadding className={classes.detailList}>
            {[
              {
                key: 'epuof',
                label: 'Name',
                value: 'name'
              },
              {
                key: 'vopcu',
                label: 'Size',
                value: 'size'
              },
              {
                key: 'haejc',
                label: 'Type',
                value: 'type'
              },
              {
                key: 'cubin',
                label: 'Last Modified',
                value: 'lastModified'
              }
            ].map(
              (item: {
                key: string
                label: string
                value: string | number
              }): React.ReactElement => (
                <ListItem key={item.key}>
                  <ListItemText
                    primary={loadedFile[item.value]}
                    secondary={item.label}
                    primaryTypographyProps={{
                      noWrap: true,
                      variant: 'h6'
                    }}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Grid item xs={8} className={classes.processOptions}>
          <Typography variant="h5">Process Options</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.previewContainer}>
        <Grid item xs={12}>
          <Typography variant="h5">File Preview</Typography>
        </Grid>
        <Grid item xs={12}>
          <nav>
            {workbook.SheetNames.map(sheetName => (
              <Button
                type="button"
                key={sheetName}
                name={sheetName}
                onClick={selectCurrentSheet}>
                {sheetName}
              </Button>
            ))}
          </nav>
        </Grid>
        <Grid item xs={12}>
          <table className={classes.table}>
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {sheetJson.map((row, rowIndex) => (
                <tr key={`tr-${rowIndex + 1}`} className={classes.tableRow}>
                  {row.map((cell, cellIndex) =>
                    /[><]/gi.test(cell) ? (
                      <Tooltip arrow title={cell} key={`td-${cellIndex + 1}`}>
                        <td
                          className={clsx(classes.dataCell, {
                            [classes.lessThan]: /<\d*\.?\d+?/i.test(cell),
                            [classes.greaterThan]: />\d*\.?\d+?/i.test(cell)
                          })}>
                          {cell}
                        </td>
                      </Tooltip>
                    ) : (
                      <td
                        key={`td-${cellIndex + 1}`}
                        className={classes.dataCell}>
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Grid>
  )
}
