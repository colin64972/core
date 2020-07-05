import classNames from 'classnames'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Form, Field } from 'formik'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { kEFields } from './fields'
import { constants } from '../constants'

const useStyles = makeStyles(theme => ({
  accordion: {
    'margin': `0 0 ${theme.custom.setSpace()}px 0`,
    'overflow': 'hidden',
    '&:last-child': {
      margin: 0
    }
  },
  form: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0 0 0`
  },
  formActionButtons: {
    ...theme.custom.setFlex('row nowrap', 'flex-start'),
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`
  },
  formActionButton: {
    'margin': `0 ${theme.custom.setSpace()}px 0 0`,
    '&:last-of-type': {
      margin: 0
    }
  },
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  },
  table: {
    borderRadius: theme.custom.borderRadius
  },
  headCell: {
    ...theme.typography.bold,
    backgroundColor: theme.palette.grey[50]
  },
  priceCell: {
    backgroundColor: theme.palette.secondary[50]
  },
  reviewKeywordsButton: {
    'backgroundColor': theme.palette.secondary[50],
    '&:hover': {
      backgroundColor: theme.palette.secondary[100]
    }
  },
  reviewListTitle: {
    ...theme.typography.mainHeading,
    color: theme.palette.primary.main,
    fontSize: theme.custom.setSpace('sm') * 1.25,
    margin: 0,
    borderRadius: theme.custom.borderRadius
  },
  code: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.custom.setSpace() / 2,
    fontFamily: 'courier, mono',
    margin: `0 0 0 ${theme.custom.setSpace() / 2}px`
  },
  reviewList: {
    backgroundColor: theme.palette.grey[100]
  }
}))

export const RequestVolumeForm = ({
  formikProps,
  closeDrawerHandler,
  kEOptions,
  trial
}) => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(null)

  const [reviewModalStatus, setReviewModalStatus] = useState(false)

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const openReviewHandler = event => setReviewModalStatus(true)

  const closeReviewHandler = event => setReviewModalStatus(false)

  return (
    <Form
      // onSubmit={formikProps.handleSubmit}
      // onReset={formikProps.resetForm}
      className={classes.form}>
      <Grid container spacing={2}>
        <Grid item>
          <FadeIn direction="x" position={-100}>
            <Accordion
              expanded={
                expanded === constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[0]
              }
              onChange={handleChange(
                constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[0]
              )}
              className={classes.accordion}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header">
                <Typography>Trial Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table size="small" className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.tableRow}>
                      <TableCell
                        component="th"
                        className={classNames(
                          classes.headCell,
                          classes.priceCell
                        )}>
                        Price for Keyword Metrics
                      </TableCell>
                      <TableCell variant="body" className={classes.priceCell}>
                        $ {constants.VOLUME_DATA.PRICE / 100} USD
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th" className={classes.headCell}>
                        ID
                      </TableCell>
                      <TableCell variant="body">{trial.id}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th" className={classes.headCell}>
                        Set Fields
                      </TableCell>
                      <TableCell variant="body">{trial.heading}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th" className={classes.headCell}>
                        Entry Count
                      </TableCell>
                      <TableCell variant="body">{trial.list.length}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th" className={classes.headCell}>
                        Time Created
                      </TableCell>
                      <TableCell variant="body">{trial.timestamp}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th" className={classes.headCell}>
                        Keywords
                      </TableCell>
                      <TableCell variant="body">
                        <Button
                          variant="contained"
                          onClick={openReviewHandler}
                          startIcon={<FindInPageIcon size="small" />}
                          classes={{
                            contained: classes.reviewKeywordsButton
                          }}>
                          Review
                        </Button>
                        <Dialog
                          onClose={closeReviewHandler}
                          aria-labelledby="customized-dialog-title"
                          open={reviewModalStatus}>
                          <DialogTitle
                            disableTypography
                            id="customized-dialog-title"
                            onClose={closeReviewHandler}
                            className={classes.reviewListTitle}>
                            Keyword List Review
                          </DialogTitle>
                          <DialogContent dividers>
                            <DialogContentText id="alert-dialog-description">
                              Review the list of keywords to purchase volume
                              metrics for here. If keyword entries include
                              domain name TLDs such as
                              <span className={classes.code}>.com</span>,
                              <span className={classes.code}>.net</span>,
                              <span className={classes.code}>.club</span>,
                              &nbsp;etc., such TLDs will be removed, and only
                              remaning keyword entries will be queried.
                            </DialogContentText>
                            <List dense className={classes.reviewList}>
                              {trial.list.map(entry => (
                                <ListItem key={`review-list-${entry}`}>
                                  <ListItemText
                                    primary={entry}
                                    align="center"
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              autoFocus
                              onClick={closeReviewHandler}
                              color="primary">
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </AccordionDetails>
            </Accordion>
          </FadeIn>
        </Grid>
        <Grid item>
          <FadeIn direction="x" position={100}>
            <Accordion
              square
              expanded={
                expanded === constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[1]
              }
              onChange={handleChange(
                constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[1]
              )}
              className={classes.accordion}>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header">
                <Typography>Keyword Metric Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {kEFields.map(kEField => (
                    <Grid item xs={12} key={kEField.key}>
                      <FadeIn
                        direction="x"
                        position={Math.random() > 0.5 ? 100 : -100}>
                        <Field name={kEField.name}>
                          {fieldProps => {
                            // console.log(
                            //   '%c fieldProps',
                            //   'color: yellow; font-size: large',
                            //   fieldProps
                            // )
                            return (
                              <FormControl
                                required
                                className={classes.formGroup}>
                                <InputLabel id={kEField.key}>
                                  {kEField.label}
                                </InputLabel>
                                <Select
                                  labelId={kEField.key}
                                  id={kEField.key}
                                  name={fieldProps.field.name}
                                  value={fieldProps.field.value}
                                  onChange={fieldProps.field.onChange}>
                                  {kEOptions[kEField.optionsName].map(
                                    option => (
                                      <MenuItem
                                        key={option.key}
                                        value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            )
                          }}
                        </Field>
                      </FadeIn>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </FadeIn>
        </Grid>
        <Grid item>
          <FadeIn direction="x" position={100}>
            <Accordion
              square
              expanded={
                expanded === constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[2]
              }
              onChange={handleChange(
                constants.VOLUME_REQUEST_FORM.ACCORDION_PANELS[2]
              )}
              className={classes.accordion}>
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header">
                <Typography>Payment Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </FadeIn>
        </Grid>
      </Grid>
      <FadeIn
        direction="y"
        position={100}
        className={classes.formActionButtons}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classNames(classes.formActionButton)}>
          Submit Order
        </Button>
        <Button
          type="reset"
          variant="contained"
          color="secondary"
          className={classNames(classes.formActionButton)}>
          Reset
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={closeDrawerHandler}
          className={classNames(classes.formActionButton)}>
          Close
        </Button>
      </FadeIn>
    </Form>
  )
}
