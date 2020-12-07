import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React from 'react'
import type { TypeOf } from 'yup'
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
    }
  }),
  { name: 'ContactForm' }
)

const contactFormSchema = object({
  name: string().min(2, 'Too short').required('Required'),
  email: string().email().required('Required'),
  messageType: number().oneOf(Object.values(messageTypes)).required('Required'),
  message: string().min(25, 'Too short').required('Required')
})

export const ContactForm: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const initialValues: TypeOf<typeof contactFormSchema> = {
    name: '',
    email: '',
    messageType: messageTypes.inquiry,
    message: ''
  }

  function submitHandler(values, actions): void {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      values,
      actions
    )
  }

  return (
    <Grid className={classes.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={contactFormSchema}>
        {formik => (
          <Form>
            <FormikField
              name="name"
              label="Name"
              inputType={inputTypes.text}
              placeholder="John"
              required
            />
            <FormikField
              name="email"
              label="Email Address"
              inputType={inputTypes.text}
              placeholder="johnsmith@gmail.com"
              required
            />
            <FormikField
              name="messageType"
              label="Message Type"
              inputType={inputTypes.select}
              required
              selectOptions={contactFormMessageTypeOptions}
            />
            <FormikField
              name="message"
              label="Message Body"
              inputType={inputTypes.text}
              placeholder="Enter message here"
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
                Submit
              </button>
              <button
                type="reset"
                disabled={!formik.dirty}
                className={clsx(classes.button, classes.reset, {
                  [classes.bgDirty]: formik.dirty
                })}>
                Reset
              </button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  )
}
