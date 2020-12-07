import NcaContact from '@cjo3/shared/assets/svgs/nca-contact'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import clsx from 'clsx'
import React from 'react'
import Loadable from 'react-loadable'
import { HeroBar } from '../HeroBar'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'

const FormLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-ContactForm" */
      './ContactForm'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <CircularProgress color="primary" size={30} />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.ContactForm
    return <Component {...props} />
  }
})

const useStyles = makeStyles(
  theme => ({
    container: {
      width: '100%',
      ...theme.custom.setFlex('column'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'center', 'flex-start')
      }
    },
    left: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        height: 377.73,
        flexGrow: 1,
        marginRight: -1
      }
    },
    center: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 1024,
        ...theme.custom.setFlex('row', 'space-between', 'flex-start')
      }
    },
    right: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        flexGrow: 1
      }
    },
    bgRed: {
      backgroundColor: theme.palette.primary.main
    },
    titleBlock: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '33.3333%'
      }
    },
    titleTop: {
      height: theme.custom.setSpace('sm'),
      clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
    },
    titleInner: {
      padding: theme.custom.setSpace('sm'),
      color: 'white',
      marginTop: -1
    },
    titleIcon: {
      fontSize: theme.typography.fontSize * 4
    },
    title: {
      ...theme.typography.shareTechMono,
      fontSize: theme.typography.fontSize * 2
    },
    titleText: {
      maxWidth: 500
    },
    titleBottom: {
      height: theme.custom.setSpace('sm'),
      clipPath: 'polygon(0 -1px, 100% -1px, 100% 0%, 0 100%)'
    },
    formBlock: {
      width: '100%',
      minHeight: 250,
      ...theme.custom.setFlex(),
      [theme.breakpoints.up('sm')]: {
        minHeight: 500,
        width: '66.6666%'
      }
    }
  }),
  { name: 'Contact' }
)

export const Contact: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <HeroBar
        src={NcaContact}
        tagline="Want to work together?"
        alt="contact-image"
      />
      <Grid className={classes.container}>
        <Grid className={clsx(classes.left, classes.bgRed)} />
        <Grid className={classes.center}>
          <Grid className={classes.titleBlock}>
            <Grid className={clsx(classes.titleTop, classes.bgRed)} />
            <Grid className={clsx(classes.titleInner, classes.bgRed)}>
              <MailOutlineIcon className={classes.titleIcon} />
              <Typography variant="h2" className={classes.title}>
                Inquiries,
                <br />
                Feedback,
                <br />
                Support
              </Typography>
              <Typography variant="body1" className={classes.titleText}>
                Send me a message to get in touch. Always happy to receive info
                requests, hear customer feedback or provide app support!
              </Typography>
            </Grid>
            <Grid className={clsx(classes.titleBottom, classes.bgRed)} />
          </Grid>
          <Grid className={classes.formBlock}>
            <FormLoadable />
          </Grid>
        </Grid>
        <Grid className={classes.right} />
      </Grid>
    </Grid>
  )
}
