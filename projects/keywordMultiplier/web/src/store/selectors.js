import { get } from 'lodash'
import { createSelector } from 'reselect'
import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'

const setsWithValuesSelector = state =>
  get(state, `form.${KeConstants.SETS_FORM_NAME}.values`, {})
const disabledSetKeySelector = state => get(state, 'app.disabled', [])
const trialsSelector = state => get(state, 'app.trials', [])
const matchTypeSelector = state => get(state, 'app.matchType', 'broad')
const noticeSelector = state => get(state, 'app.notice', {})
const copySettingsSelector = state => get(state, 'app.copySettings', {})
const ipSelector = state => get(state, 'app.ip', null)
const spinnerStatusSelector = (state, setName) =>
  get(state, `app.spinnerStatuses.${setName}`)
const whiteSpaceSelector = state =>
  get(
    state,
    'app.whiteSpaceSelection',
    KeConstants.WHITESPACE_OPTIONS.DISABLED.VALUE
  )

export const checkSetDisabled = (state, set) => {
  const sets = get(state, `app.disabled`, [])
  return sets.includes(set)
}

export const checkSubmitDisabled = createSelector(
  [setsWithValuesSelector, disabledSetKeySelector],
  (setsWithValues, disabledSetKeys) => {
    const setsWithValuesCount = Object.keys(setsWithValues).length
    const disabledSetKeyCount = disabledSetKeys.length
    if (setsWithValuesCount - disabledSetKeyCount > 1) return false
    return true
  }
)

export const checkResetDisabled = createSelector(
  setsWithValuesSelector,
  setsWithValues => Object.values(setsWithValues).length < 1
)

export const getTrials = createSelector(trialsSelector, trials => trials)

export const getMatchType = createSelector(
  matchTypeSelector,
  matchType => matchType
)

export const getNotice = createSelector(noticeSelector, notice => notice)

export const getCopySettings = createSelector(
  copySettingsSelector,
  settings => settings
)

export const getClientIp = createSelector(ipSelector, ip => ip)

export const getSpinnerStatus = createSelector(
  spinnerStatusSelector,
  status => status
)

export const getWhiteSpaceSelection = createSelector(
  whiteSpaceSelector,
  selection => selection
)
