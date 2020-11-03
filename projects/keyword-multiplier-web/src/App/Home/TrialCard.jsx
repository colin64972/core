import gsap from 'gsap'
import PropTypes from 'prop-types'
import React, { createRef, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { types } from '../../store/types'
import { TrialCardHeader } from './TrialCardHeader'
import { TrialCardTable } from './TrialCardTable'

const useStyles = makeStyles(theme => ({
  expandIcon: {
    position: 'relative',
    right: 25,
    top: 15
  },
  trialCard: {
    width: '100%'
  },
  trialList: {
    '& :last-child': {
      margin: 0
    },
    'margin': 0,
    'padding': theme.custom.setSpace()
  },
  trialListItem: {
    textAlign: 'left'
  }
}))

export const TrialCard = ({ isShown, trial }) => {
  const { id, billableKeywords } = trial

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
      tableRef: copyRef.current,
      id
    })
  }

  const askDeleteTrialHandler = event => {
    event.stopPropagation()
    return dispatch({
      type: types.ASK_DELETE_TRIAL,
      id
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
      billableKeywords.length > 100 || KeCredits < billableKeywords.length
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
    <div className={classes.trialCard} ref={card} id={id}>
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

TrialCard.propTypes = {
  isShown: PropTypes.bool.isRequired,
  trial: PropTypes.shape({
    id: PropTypes.string.isRequired,
    geoIp: PropTypes.object,
    heading: PropTypes.string.isRequired,
    timestampUpdated: PropTypes.string.isRequired,
    updatedAt: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.string),
    billableKeywords: PropTypes.arrayOf(PropTypes.string)
  })
}
