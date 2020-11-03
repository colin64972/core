import PropTypes from 'prop-types'
import React from 'react'

import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'

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

NoticeIcon.propTypes = {
  bg: PropTypes.string
}
