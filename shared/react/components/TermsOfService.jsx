import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  mainHeading: {
    ...theme.typography.bold,
    fontSize: theme.custom.setSpace('sm'),
    color: theme.palette.primary.main
  },
  subHeading: {
    fontSize: theme.custom.setSpace() * 1.5,
    color: theme.palette.bodyColor,
    textTransform: 'unset'
  }
}))

export const TermsOfService = ({ open, closeHandler }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>
        <Typography className={classes.mainHeading}>
          Terms of Service
        </Typography>
        <Typography className={classes.subHeading}>
          Updated October 8th, 2020
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.subHeading}>General</Typography>
        <DialogContentText>
          Please read these Terms of Service carefully before using our website
          (the "Service"). Your access to and use of the Service is based on
          your acceptance of and compliance with these Terms. These Terms apply
          to all visitors, users and others who access or use the Service. By
          accessing or using the Service you agree to be bound by these Terms
          and accept all legal consequences. If you do not agree to these terms
          and conditions, in whole or in part, please do not use the Service.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
