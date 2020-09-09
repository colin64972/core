import gsap from 'gsap'
import React, { createRef, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import { formatDomainMode, formatMatchType } from '../logic'
import { getMatchType, getDomainMode } from '../../store/selectors'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => {
  const button = {
    'border': 'none',
    'fontSize': theme.custom.setSpace(),
    'padding': theme.custom.setSpace() / 2,
    'margin': `0 ${theme.custom.setSpace() / 2}px 0 0`,
    'borderRadius': theme.custom.borderRadius,
    'cursor': 'pointer',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'transition': 'all 250ms ease-out',
    '&:focus': {
      outline: 'none'
    }
  }
  return {
    trialCard: {
      'width': '100%',
      'margin': `${theme.custom.setSpace()}px 0 0 0`,
      '&:nth-child(1)': {
        marginTop: 0
      },
      [theme.breakpoints.up('sm')]: {
        'width': `calc(50% - ((${theme.custom.setSpace('sm')}px * 1) / 2))`,
        'margin': `${theme.custom.setSpace('sm')}px ${theme.custom.setSpace(
          'sm'
        )}px 0 0`,
        '&:nth-child(1), &:nth-child(2)': {
          marginTop: 0
        },
        '&:nth-child(2n)': {
          marginRight: 0
        }
      },
      [theme.breakpoints.up('xl')]: {
        'width': `calc(33.3333% - ((${theme.custom.setSpace(
          'sm'
        )}px * 2) / 3))`,
        'margin': `${theme.custom.setSpace('sm')}px ${theme.custom.setSpace(
          'sm'
        )}px 0 0`,
        '&:nth-child(1), &:nth-child(3)': {
          marginTop: 0
        },
        '&:nth-child(2)': {
          marginTop: 0,
          marginRight: 0
        },
        '&:nth-child(2n)': {
          marginRight: theme.custom.setSpace('sm')
        },
        '&:nth-child(3n)': {
          marginRight: 0
        }
      }
    },
    trialCardHeading: {
      textAlign: 'left',
      textTransform: 'unset',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.custom.setSpace() * 1.5
      }
    },
    trialCardHeadingSlug: {
      fontSize: theme.typography.fontSize,
      textAlign: 'left',
      textTransform: 'unset'
    },
    trialList: {
      'padding': theme.custom.setSpace(),
      'margin': 0,
      '& :last-child': {
        margin: 0
      }
    },
    trialListItem: {
      textAlign: 'left'
    },
    copyButton: {
      ...button,
      'color': theme.palette.primary[50],
      'backgroundColor': theme.palette.primary[200],
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.pass[500]
      }
    },
    icon: {
      fontSize: theme.custom.setSpace() * 1.5
    },
    deleteButton: {
      ...button,
      'marginRight': 0,
      'color': theme.palette.secondary[50],
      'backgroundColor': theme.palette.secondary[200],
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.fail[500]
      }
    },
    cardInfo: {
      marginTop: theme.custom.setSpace()
    },
    tableHeadCell: {
      margin: 0,
      color: theme.palette.secondary[200],
      ...theme.typography.bold,
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.fontSize
      }
    },
    data: {
      wordBreak: 'break-all',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.fontSize
      }
    },
    id: {
      color: theme.palette.secondary[200],
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.fontSize
      }
    }
  }
})

export const TrialCard = ({ trial, isShown, isLastShown }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const copyRef = createRef()
  const card = createRef()
  const matchType = useSelector(state => getMatchType(state))
  const domainMode = useSelector(state => getDomainMode(state))
  const copyHandler = event => {
    event.stopPropagation()
    dispatch({
      type: types.COPY_TRIAL,
      slug: event.currentTarget.dataset.slug,
      ref: copyRef.current
    })
  }
  const askDeleteTrial = event => {
    event.stopPropagation()
    return dispatch({
      type: types.ASK_DELETE_TRIAL,
      slug: event.currentTarget.dataset.slug
    })
  }

  let timeline = gsap.timeline({ paused: true })
  useLayoutEffect(() => {
    if (isShown) {
      timeline
        .fromTo(
          card.current,
          {
            opacity: 0,
            transform: 'scale(0)'
          },
          {
            duration: 0.25,
            opacity: 1,
            transform: 'scale(1)',
            ease: 'back.out(1.5)'
          }
        )
        .play()
    } else {
      timeline
        .fromTo(
          card.current,
          {
            opacity: 1,
            transform: 'scale(1)'
          },
          {
            duration: 0.25,
            ease: 'back.in(1.5)',
            opacity: 0,
            transform: 'scale(0)'
          }
        )
        .play()
    }
    return () => {
      timeline.kill()
    }
  }, [isShown])
  return (
    <div className={classes.trialCard} ref={card} id={trial.slug}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <Grid container>
                <button
                  data-slug={trial.slug}
                  onClick={copyHandler}
                  className={classes.copyButton}>
                  <AssignmentIcon className={classes.icon} />
                </button>
                <button
                  type="button"
                  data-slug={trial.slug}
                  onClick={askDeleteTrial}
                  className={classes.deleteButton}>
                  <DeleteIcon className={classes.icon} />
                </button>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.cardInfo}>
              <Typography variant="h6" className={classes.trialCardHeading}>
                {trial.heading}
              </Typography>
              <Typography
                variant="body1"
                className={classes.trialCardHeadingSlug}>
                {trial.slug}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Entry</TableCell>
                <TableCell className={classes.tableHeadCell}>Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={copyRef} id={trial.slug}>
              {trial.list.map((item, index) => (
                <TableRow key={`${trial.slug} -${index} `}>
                  <TableCell component="td" className={classes.id}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="data"
                    className={classes.data}>
                    {domainMode === true
                      ? formatDomainMode(item)
                      : formatMatchType(item, matchType)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
