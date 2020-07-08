import React from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { defaultPadding } from '@colin30/shared/react/theming'
import { RequestVolumeForm } from './RequestVolumeForm'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

const useStyles = makeStyles(theme => ({
  paper: {
    ...theme.custom.setFlex('column', 'center', 'flex-start'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    backgroundColor: theme.palette.secondary[100]
  },
  subHeading: {
    width: '100%',
    textAlign: 'left'
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    width: '100%',
    textAlign: 'left'
  }
}))

const RequestVolume = ({ drawerStatus, closeDrawerHandler, trial }) => {
  const classes = useStyles()

  const countryOptions = useSelector(state => state.kE.countries)
  const currencyOptions = useSelector(state => state.kE.currencies)
  const dataSourceOptions = useSelector(state => state.kE.dataSources)

  const initalValues = {
    country: countryOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_COUNTRY
    ).value,
    currency: currencyOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_CURRENCY
    ).value,
    dataSource: dataSourceOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_DATASOURCE
    ).value
  }

  const customSubmitHandler = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      JSON.stringify(values, null, 2),
      JSON.stringify(actions, null, 2)
    )
  }

  return (
    <Dialog
      open={drawerStatus}
      transitionDuration={500}
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen
      PaperProps={{
        classes: {
          root: classes.paper
        }
      }}>
      <FadeIn direction="x" position={-100}>
        <Typography variant="subtitle2" className={classes.subHeading}>
          Order Form
        </Typography>
      </FadeIn>
      <FadeIn direction="x" position={-100}>
        <Typography variant="h4" className={classes.mainHeading}>
          Keyword Volume Metrics
        </Typography>
      </FadeIn>
      <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
        {formikProps => (
          <RequestVolumeForm
            trial={trial}
            closeDrawerHandler={closeDrawerHandler}
            kEOptions={{
              countryOptions,
              currencyOptions,
              dataSourceOptions
            }}
            formikProps={formikProps}
          />
        )}
      </Formik>
    </Dialog>
  )
}

export default RequestVolume
