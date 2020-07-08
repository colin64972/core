import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/styles'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: theme.custom.setSpace('sm')
  }
}))

export const NoticeIcon = ({ bg }) => {
  const classes = useStyles()
  switch (bg) {
    case constants.NOTICE.BGS.WARN:
      return <WarningIcon className={classes.icon} />
    case constants.NOTICE.BGS.FAIL:
      return <ErrorIcon className={classes.icon} />
    default:
      return <CheckCircleIcon className={classes.icon} />
  }
}
