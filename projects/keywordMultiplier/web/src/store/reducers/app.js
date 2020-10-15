import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { types } from '../types'

const defaultState = {
  disabledSets: [],
  trials: {
    items: [],
    shown: []
  },
  spinnerStatuses: {
    [constants.SETS_FORM_NAME]: false,
    [constants.VOLUME_SPINNER]: false
  },
  tldsHidden: false,
  matchType: constants.MATCHTYPES.BROAD,
  matchTypePrev: constants.MATCHTYPES.BROAD,
  copyKeywordsOnly: false,
  whiteSpaceSelection: constants.WHITESPACE_OPTIONS.DISABLED.VALUE,
  notice: {
    show: false,
    item: null,
    choice: null
  },
  geoIp: null
}

export const app = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_DISABLED_SET:
      return {
        ...state,
        disabledSets: [...state.disabledSets, action.fieldName]
      }
    case types.REMOVE_DISABLED_SET:
      return {
        ...state,
        disabledSets: state.disabledSets.filter(
          setName => setName !== action.fieldName
        )
      }
    case types.RESET_ALL_BUT_NOTICE:
      return {
        ...defaultState,
        notice: state.notice
      }
    case types.ADD_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          items: [...state.trials.items, action.trial]
        }
      }
    case types.SHOW_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          shown: [...state.trials.shown, action.id]
        }
      }
    case types.HIDE_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          shown: state.trials.shown.filter(id => id !== action.id)
        }
      }
    case types.DELETE_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          items: state.trials.items.filter(trial => trial.id !== action.id)
        }
      }
    case types.DELETE_ALL_TRIALS:
      return {
        ...state,
        trials: defaultState.trials
      }
    case types.CHANGE_MATCHTYPE:
      return {
        ...state,
        matchType: action.matchType,
        matchTypePrev: action.matchType,
        whiteSpaceSelection: constants.WHITESPACE_OPTIONS.DISABLED.VALUE
      }
    case types.ADD_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          item: action.notice
        }
      }
    case types.SHOW_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          show: true
        }
      }
    case types.HIDE_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          show: false
        }
      }
    case types.REMOVE_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          item: null
        }
      }
    case types.TOGGLE_COPY_KEYWORDS_ONLY:
      return {
        ...state,
        copyKeywordsOnly: !state.copyKeywordsOnly
      }
    case types.ADD_GEO_IP:
      return {
        ...state,
        geoIp: action.geoIp
      }
    case types.CHANGE_WHITESPACE_SELECTION:
      return {
        ...state,
        whiteSpaceSelection: action.selection,
        matchType:
          action.selection === constants.WHITESPACE_OPTIONS.DISABLED.VALUE
            ? state.matchTypePrev
            : constants.MATCHTYPES.BROAD
      }
    case types.SET_SPINNER_STATUS:
      return {
        ...state,
        spinnerStatuses: {
          ...state.spinnerStatuses,
          [action.spinnerName]: action.status
        }
      }
    case types.UPDATE_TRIAL:
      return {
        ...state,
        trials: {
          ...state.trials,
          items: [
            ...state.trials.items.filter(
              item => item.id !== action.updatedTrial.id
            ),
            action.updatedTrial
          ]
        }
      }
    case types.TOGGLE_HIDE_TLDS:
      return {
        ...state,
        tldsHidden: !state.tldsHidden
      }
    default:
      return state
  }
}
