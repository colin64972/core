import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { defaultPadding } from '@northtrend/shared/react/theming'
import { FadeIn } from '@northtrend/shared/react/components/FadeIn'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { setFields } from './fields'
import { SetsForm } from './SetsForm'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  setsSection: {
    backgroundColor: theme.palette.grey[500],
    ...theme.custom.setFlex('column nowrap'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    textAlign: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  mainHeading: theme.typography.mainHeading
}))

export const Sets = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  let initialValues = {
    ...setFields.reduce((acc, cur) => {
      let temp = acc
      temp[cur.textArea.setName] = ''
      return temp
    }, {})
  }

  if (process.env.USE_MOCKS) {
    initialValues = {
      setField1: 'good\nfast\nsuper',
      setField2: '',
      setField3: 'cars\nautos\nvehicles',
      setField4: '.com\n.ca\n.net',
      setField5: ''
    }
  }

  const customSubmitHandler = (values, actions) =>
    dispatch({
      type: types.MULTIPLY_SETS,
      values
    })

  return (
    <Grid item xs={12} component="section" className={classes.setsSection}>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={2} />
        </Hidden>
        <Grid item xs={12} sm={8}>
          <FadeIn direction="y" position={-100}>
            <Typography variant="subtitle2">
              Explore Search Query Variation
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h4" className={classes.mainHeading}>
              Improve your Content Marketing Efforts with Precision Targeting
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={100}>
            <Typography variant="body1">
              There are many ways to express search intent; therefore, as a
              content producer, it is worth your while to explore variations of
              your consumers&apos; expected search queries to objectively
              evaluate and compare the keywords that will reveal their intent.
              Use the textareas below to formulate search query variations.
            </Typography>
          </FadeIn>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={2} />
        </Hidden>
        <Grid item xs={12}>
          <Formik
            component={SetsForm}
            initialValues={initialValues}
            onSubmit={customSubmitHandler}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
