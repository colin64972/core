import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { TypeOf } from 'yup'
import { postMessage } from '../fetchers'
import { number, object, string } from 'yup'
import {
  contactFormMessageTypeOptions,
  inputTypes,
  messageTypes
} from '../constants'
import { FormikField } from './FormikField'

const useStyles = makeStyles(
  theme => ({
    container: {
      width: '100%',
      padding: theme.custom.setSpace('sm'),
      paddingBottom: theme.custom.setSpace('md')
    },
    buttons: {
      ...theme.custom.setFlex()
    },
    button: {
      'border': 'none',
      'padding': theme.custom.setSpace(),
      ...theme.typography.shareTechMono,
      'textTransform': 'uppercase',
      'width': '100%',
      'marginRight': theme.custom.setSpace(),
      '&:last-child': {
        margin: 0
      }
    },
    bgBlue: {
      backgroundColor: 'blue'
    },
    bgDirty: {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer'
    },
    bgValid: {
      backgroundColor: theme.palette.secondary.main,
      cursor: 'pointer'
    },
    mailSentContainer: {
      ...theme.custom.setFlex('column'),
      height: 300,
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        top: theme.custom.setSpace('md') * -1
      }
    },
    mailSentIcon: {
      fontSize: theme.typography.fontSize * 5
    },
    mailSentText: {
      ...theme.typography.shareTechMono,
      marginTop: theme.custom.setSpace('sm'),
      maxWidth: 400,
      textAlign: 'center'
    }
  }),
  { name: 'ContactForm' }
)

interface Props {
  content: string[] | null
}

export const ContactForm: React.FC<Props> = ({
  content
}): JSX.Element | null => {
  if (!content) return null

  const contactFormSchema = object({
    name: string().min(2, content[3]).required(content[4]),
    email: string().email().required(content[4]),
    messageType: number()
      .oneOf(Object.values(messageTypes))
      .required(content[4]),
    message: string().min(25, content[3]).required(content[4])
  })

  const classes = useStyles()

  const initialValues: TypeOf<typeof contactFormSchema> = {
    name: '',
    email: '',
    messageType: messageTypes.inquiry,
    message: ''
  }

  const [mailRequest, setMailRequest] = useState<boolean>(false)
  const [mailFail, setMailFail] = useState<boolean>(false)

  function submitHandler(values, actions): void {
    actions.setSubmitting(true)
    postMessage(values, window.location.hostname, window.location.pathname)
      .then(() => {
        setMailRequest(true)
        actions.setSubmitting(false)
        actions.resetForm()
      })
      .catch(error => {
        setMailRequest(true)
        setMailFail(true)
        actions.setSubmitting(false)
        actions.resetForm()
      })
  }

  return (
    <Grid className={classes.container}>
      {mailRequest ? (
        <Grid className={classes.mailSentContainer}>
          {mailFail ? (
            <ErrorOutlineIcon
              color="primary"
              className={classes.mailSentIcon}
            />
          ) : (
            <MarkunreadMailboxIcon
              color="primary"
              className={classes.mailSentIcon}
            />
          )}

          <Typography variant="h4" className={classes.mailSentText}>
            {mailFail ? content[5] : content[6]}
          </Typography>
        </Grid>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={contactFormSchema}>
          {formik => (
            <Form>
              <FormikField
                name="name"
                label={content[7]}
                inputType={inputTypes.text}
                placeholder={content[8]}
                required
              />
              <FormikField
                name="email"
                label={content[9]}
                inputType={inputTypes.text}
                placeholder={content[10]}
                required
              />
              <FormikField
                name="messageType"
                label={content[11]}
                inputType={inputTypes.select}
                required
                selectOptions={contactFormMessageTypeOptions}
              />
              <FormikField
                name="message"
                label={content[12]}
                inputType={inputTypes.text}
                placeholder={content[13]}
                required
                rows={5}
              />

              <Grid className={classes.buttons}>
                <button
                  type="submit"
                  disabled={
                    formik.isSubmitting || !formik.dirty || !formik.isValid
                  }
                  className={clsx(classes.button, classes.submit, {
                    [classes.bgValid]: formik.dirty && formik.isValid
                  })}>
                  {formik.isSubmitting ? content[14] : content[15]}
                </button>
                <button
                  type="reset"
                  disabled={!formik.dirty}
                  className={clsx(classes.button, classes.reset, {
                    [classes.bgDirty]: formik.dirty
                  })}>
                  {content[16]}
                </button>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </Grid>
  )
}
