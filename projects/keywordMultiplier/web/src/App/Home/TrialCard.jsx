import classNames from 'classnames'
import gsap from 'gsap'
import React, { createRef, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import { TrialCardHeader } from './TrialCardHeader'
import { TrialCardTable } from './TrialCardTable'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
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
  },
  trialCardFullWIdth: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0 0 0`,
    [theme.breakpoints.up('sm')]: null,
    [theme.breakpoints.up('xl')]: null
  },
  expandIcon: {
    position: 'relative',
    top: 15,
    right: 25
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
  }
}))

export const TrialCard = ({ trial, isShown }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const card = createRef()
  const copyRef = createRef()

  const KeCredits = useSelector(state => state.kE?.credits)

  const [volumeUnobtainable, setVolumeUnobtainable] = useState(false)

  const copyHandler = event => {
    event.stopPropagation()
    return dispatch({
      type: types.COPY_TRIAL,
      id: trial.id,
      ref: copyRef.current
    })
  }

  const askDeleteTrialHandler = event => {
    event.stopPropagation()
    return dispatch({
      type: types.ASK_DELETE_TRIAL,
      id: trial.id
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

  useEffect(() => {
    setVolumeUnobtainable(
      trial.billableKeywords.length > 100 ||
        KeCredits < trial.billableKeywords.length
    )
  }, [KeCredits])

  const accordionChangeHandler = (event, expanded) => {
    if (expanded)
      return dispatch({
        type: types.GET_KE_CREDITS
      })
    return null
  }

  return (
    <div
      className={classNames(classes.trialCard, {
        [classes.trialCardFullWIdth]: trial.volumeData
      })}
      ref={card}
      id={trial.id}>
      <Accordion onChange={accordionChangeHandler}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            expandIcon: classes.expandIcon
          }}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <TrialCardHeader
            trial={trial}
            copyHandler={copyHandler}
            askDeleteTrialHandler={askDeleteTrialHandler}
          />
        </AccordionSummary>
        <AccordionDetails>
          <TrialCardTable
            trial={trial}
            copyRef={copyRef}
            volumeUnobtainable={volumeUnobtainable}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
