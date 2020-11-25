import clsx from 'clsx'
import gsap from 'gsap'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'

import { types } from '../../store/types'
import { NoticeIcon } from './NoticeIcon'

const useStyles = makeStyles(theme => {
  const noticeButton = {
    'border': 'none',
    'padding': `${theme.custom.setSpace() / 2}px`,
    'borderRadius': theme.custom.borderRadius,
    'marginRight': `${theme.custom.setSpace() / 2}px`,
    'background': 'transparent',
    'cursor': 'pointer',
    'transition': 'all 250ms ease-out',
    ...theme.custom.setFlex(),
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      'backgroundColor': 'rgba(0, 0, 0, 0.05)',
      '& svg': {
        color: 'black'
      }
    },
    '&:last-child': {
      marginRight: 'unset'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: `${theme.custom.setSpace() / 2}px`,
      padding: 0
    }
  }
  return {
    pass: {
      backgroundColor: theme.palette.pass[500]
    },
    warn: {
      backgroundColor: theme.palette.warn[500]
    },
    fail: {
      backgroundColor: theme.palette.fail[500]
    },
    screen: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      zIndex: 1,
      top: 0,
      left: 0,
      opacity: 0,
      background: theme.palette.screens.backdrop
    },
    noticeBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 2,
      width: 'inherit',
      boxShadow: `0 ${theme.custom.setSpace() / 2}px ${
        theme.custom.setSpace() / 2
      }px rgba(0, 0, 0, 0.15)`
    },
    timeoutBar: {
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 3,
      width: 0,
      height: constants.NOTICE.TIMEOUT_HEIGHT
    },
    passTimeoutBar: {
      backgroundColor: theme.palette.pass[100]
    },
    warnTimeoutBar: {
      backgroundColor: theme.palette.warn[100]
    },
    failTimeoutBar: {
      backgroundColor: theme.palette.fail[300]
    },
    noticeBarInner: {
      padding: `
        ${theme.custom.setSpace() - constants.NOTICE.TIMEOUT_HEIGHT}px
        ${theme.custom.setSpace('sm')}px
        ${theme.custom.setSpace()}px
        ${theme.custom.setSpace('sm')}px
      `,
      ...theme.custom.setFlex('row nowrap', 'space-between'),
      [theme.breakpoints.down('xs')]: {
        flexFlow: 'column nowrap',
        paddingBottom: `${
          theme.custom.setSpace() - constants.NOTICE.TIMEOUT_HEIGHT
        }px`
      }
    },
    noticeBarInnerLeft: {
      ...theme.custom.setFlex(),
      [theme.breakpoints.down('xs')]: {
        flexFlow: 'column nowrap'
      }
    },
    heading: {
      ...theme.custom.setFlex()
    },
    headingIcon: {
      fontSize: theme.custom.setSpace('sm')
    },
    headingText: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize * 1.125,
      textAlign: 'left',
      lineHeight: 1.25,
      textTransform: 'uppercase',
      margin: `0 ${theme.custom.setSpace() / 2}px`,
      ...theme.typography.bold,
      [theme.breakpoints.down('xs')]: {
        margin: `0 0 0 ${theme.custom.setSpace() / 2}px`
      }
    },
    messageText: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      textAlign: 'left',
      lineHeight: 1.125,
      margin: 0,
      position: 'relative',
      top: 1,
      [theme.breakpoints.down('xs')]: {
        margin: `${theme.custom.setSpace() / 2}px 0 0 0`,
        textAlign: 'center'
      }
    },
    noticeBarInnerRight: {
      ...theme.custom.setFlex()
    },
    buttonAccept: {
      ...noticeButton
    },
    buttonReject: {
      ...noticeButton
    },
    buttonRejectSingle: {
      ...noticeButton,
      marginRight: 'unset'
    },
    icon: {
      color: theme.palette.bodyColor
    }
  }
})

export const Notice = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const screen = useRef()

  const timeoutBar = useRef()

  const noticeBar = useRef()

  const { show, item } = useSelector(state => state.app.notice)

  let timeline = gsap.timeline({ paused: true })

  const responseHandler = (event, choice = null) => {
    if (event) {
      choice = event.currentTarget.value
    }
    return dispatch({
      type: types.TAKE_NOTICE_RESPONSE,
      choice
    })
  }

  const keyUpHandler = () => {
    const { keyCode } = event
    let choice
    switch (keyCode) {
      case 27:
        choice = constants.NOTICE.RESPONSES.REJECT
        break
      case 13:
        choice = constants.NOTICE.RESPONSES.ACCEPT
        break
    }
    return responseHandler(null, choice)
  }

  if (process.env.IS_NOT_SERVER) {
    useLayoutEffect(() => {
      if (show) {
        timeline
          .add(
            gsap.to(screen.current, {
              duration: 0.25,
              opacity: 1
            }),
            0
          )
          .add(
            gsap.from(timeoutBar.current, {
              duration: constants.NOTICE.TIMEOUT_DELAY / 1000,
              width: '100%',
              ease: 'linear'
            }),
            0
          )
          .fromTo(
            noticeBar.current,
            {
              opacity: 0,
              y: noticeBar.current.offsetHeight * -1
            },
            {
              duration: 0.25,
              ease: 'back.out(1.5)',
              opacity: 1,
              y: 0
            },
            0.25
          )
          .play()
      } else {
        timeline
          .fromTo(
            noticeBar.current,
            {
              opacity: 1,
              y: 0
            },
            {
              ease: 'back.in(1.5)',
              opacity: 0,
              y: noticeBar.current.offsetHeight * -1
            }
          )
          .add(
            gsap.to(screen.current, {
              opacity: 0
            }),
            0.25
          )
          .play()
      }
      return () => {
        timeline.kill()
        timeoutBar.current.setAttribute('style', 'width: 0;')
      }
    }, [show])
  }
  useEffect(() => {
    if (item) {
      document.addEventListener('keyup', keyUpHandler)
    }
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [item])

  if (item) {
    const { kind, bg, heading, message } = item
    return (
      <div className={classes.screen} ref={screen}>
        <div
          className={[classes.noticeBar, classes[bg]].join(' ')}
          ref={noticeBar}>
          <div
            className={clsx(classes.timeoutBar, classes[`${bg}TimeoutBar`])}
            ref={timeoutBar}
          />
          <div className={classes.noticeBarInner}>
            <div className={classes.noticeBarInnerLeft}>
              <div className={classes.heading}>
                <NoticeIcon bg={bg} className={classes.headingIcon} />
                <h6 className={classes.headingText}>{heading}</h6>
              </div>
              <p className={classes.messageText}>{message}</p>
            </div>
            <div className={classes.noticeBarInnerRight}>
              {kind === constants.NOTICE.KINDS.CHOICE && (
                <button
                  type="button"
                  className={classes.buttonAccept}
                  value={constants.NOTICE.RESPONSES.ACCEPT}
                  onClick={responseHandler}>
                  <DoneIcon className={classes.icon} />
                </button>
              )}
              <button
                type="button"
                className={
                  kind === constants.NOTICE.KINDS.CHOICE
                    ? classes.buttonReject
                    : classes.buttonRejectSingle
                }
                value={constants.NOTICE.RESPONSES.REJECT}
                onClick={responseHandler}>
                <CloseIcon className={classes.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={screen}>
      <div ref={noticeBar}>
        <div ref={timeoutBar} className={classes.timeoutBar} />
      </div>
    </div>
  )
}
