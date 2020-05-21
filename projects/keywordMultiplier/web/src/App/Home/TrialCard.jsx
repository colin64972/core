import classNames from 'classnames'
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
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'
import { formatProductLine } from '../logic'
import { getMatchType, getWhiteSpaceSelection } from '../../store/selectors'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => {
  const iconButton = {
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

  const trialCard = {
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
      'width': `calc(33.3333% - ((${theme.custom.setSpace('sm')}px * 2) / 3))`,
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
  }

  return {
    trialCard,
    trialCardFullWIdth: {
      width: '100%',
      margin: `${theme.custom.setSpace()}px 0 0 0`,
      [theme.breakpoints.up('sm')]: null,
      [theme.breakpoints.up('xl')]: null
    },
    trialCardHeading: {
      textAlign: 'left',
      textTransform: 'unset',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.custom.setSpace() * 1.5
      }
    },
    trialCardHeadingId: {
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
      ...iconButton,
      'color': theme.palette.primary[50],
      'backgroundColor': theme.palette.primary[200],
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.pass[500]
      }
    },
    deleteButton: {
      ...iconButton,
      'marginRight': 0,
      'color': theme.palette.secondary[50],
      'backgroundColor': theme.palette.secondary[200],
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.fail[500]
      }
    },
    requestVolumeButton: {
      ...iconButton,
      'color': theme.palette.primary[50],
      'backgroundColor': theme.palette.primary[200],
      'margin': '0 auto',
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.pass[500]
      }
    },
    actionButtonIcon: {
      fontSize: theme.custom.setSpace() * 1.5
    },
    requestVolumeButtonIcon: {
      fontSize: theme.custom.setSpace()
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
    tableCellData: {
      wordBreak: 'break-all',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.fontSize
      }
    },
    trialId: {
      color: theme.palette.secondary[200],
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.fontSize
      }
    }
  }
})

export const TrialCard = ({ trial, isShown }) => {
  console.log('%c trial', 'color: yellow; font-size: large', trial)
  const classes = useStyles()

  const dispatch = useDispatch()

  const copyRef = createRef()

  const card = createRef()

  const matchType = useSelector(state => getMatchType(state))

  const whiteSpaceSelection = useSelector(state =>
    getWhiteSpaceSelection(state)
  )

  const copyHandler = event => {
    event.stopPropagation()
    dispatch({
      type: types.COPY_TRIAL,
      id: event.currentTarget.dataset.id,
      ref: copyRef.current
    })
  }

  const askDeleteTrial = event => {
    event.stopPropagation()
    return dispatch({
      type: types.ASK_DELETE_TRIAL,
      id: event.currentTarget.dataset.id
    })
  }

  const requestVolumeHandler = event => {
    console.log(
      '%c volumeHandler',
      'color: yellow; font-size: large',
      event.currentTarget.dataset.id
    )
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

  const getVolumeData = (entryId, dataKind) => {}
  return (
    <div
      className={classNames(classes.trialCard, {
        [classes.trialCardFullWIdth]: trial.volumeData
      })}
      ref={card}
      id={trial.id}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <Grid container>
                <button
                  data-id={trial.id}
                  onClick={copyHandler}
                  className={classes.copyButton}>
                  <AssignmentIcon className={classes.actionButtonIcon} />
                </button>
                <button
                  type="button"
                  data-id={trial.id}
                  onClick={askDeleteTrial}
                  className={classes.deleteButton}>
                  <DeleteIcon className={classes.actionButtonIcon} />
                </button>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.cardInfo}>
              <Typography variant="h6" className={classes.trialCardHeading}>
                {trial.heading}
              </Typography>
              <Typography
                variant="body1"
                className={classes.trialCardHeadingId}>
                {trial.id}
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
                <TableCell className={classes.tableHeadCell}>Volume</TableCell>
                {trial.volumeData &&
                  ['CPC', 'Comp'].map(item => (
                    <TableCell className={classes.tableHeadCell}>
                      {item}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody ref={copyRef} id={trial.id}>
              {trial.list.map((keyword, keywordIndex) => (
                <TableRow key={`${trial.id}-${keywordIndex}`}>
                  <TableCell component="td" className={classes.trialId}>
                    {keywordIndex + 1}
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="data"
                    className={classes.tableCellData}>
                    {formatProductLine(keyword, matchType, whiteSpaceSelection)}
                  </TableCell>
                  <TableCell component="td">
                    {trial.volumeData ? (
                      trial.volumeData[keywordIndex].vol
                    ) : (
                      <button
                        type="button"
                        onClick={requestVolumeHandler}
                        data-id={trial.id}
                        className={classes.requestVolumeButton}>
                        <SearchIcon
                          className={classes.requestVolumeButtonIcon}
                        />
                      </button>
                    )}
                  </TableCell>
                  {trial.volumeData && (
                    <TableCell component="td">
                      {trial.volumeData[keywordIndex].cpc.value}
                    </TableCell>
                  )}
                  {trial.volumeData && (
                    <TableCell component="td">
                      {trial.volumeData[keywordIndex].competition}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
