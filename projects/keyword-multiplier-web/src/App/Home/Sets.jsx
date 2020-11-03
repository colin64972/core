import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { defaultPadding } from '@cjo3/shared/react/themes/theming'
import { Grid, Hidden, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { types } from '../../store/types'
import { SetsForm } from './SetsForm'
import { setFields } from './fields'

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
  mainHeading: theme.typography.mainHeading,
  subHeading: theme.typography.subHeading
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
        <Hidden smDown>
          <Grid item md={1} lg={2} />
        </Hidden>
        <Grid item xs={12} md={10} lg={8}>
          <FadeIn direction="y" position={-100}>
            <Typography component="h4" className={classes.subHeading}>
              Create Keyword Variations with Ease
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography component="h3" className={classes.mainHeading}>
              Improve your Content Marketing Efforts with Precision Targeting
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={100}>
            <Typography variant="body1">
              There are many ways to express search intent, and each query can
              result in varying levels of search volume each month. Therefore,
              if you are working as a content producer or online marketer, it is
              worth your while to explore the variations within your
              consumers&apos; expected search query language. Using keyword
              variations can help you add depth to your content&apos;s search
              value, and even uncover new perspectives to write from. Use the
              text areas below to generate patterned search phrases in order to
              evaluate the effectiveness of your content topics and language.
            </Typography>
          </FadeIn>
        </Grid>
        <Hidden smDown>
          <Grid item md={1} />
        </Hidden>
        <Grid container>
          <Hidden smDown>
            <Grid item md={1} />
          </Hidden>
          <Grid item xs={12} md={10}>
            <Formik
              component={SetsForm}
              initialValues={initialValues}
              onSubmit={customSubmitHandler}
            />
          </Grid>
          <Hidden smDown>
            <Grid item md={1} lg={2} />
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  )
}
