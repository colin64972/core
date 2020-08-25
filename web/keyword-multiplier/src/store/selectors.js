import { get } from 'lodash'
import { createSelector } from 'reselect'
import { removeSetPrefix } from '../App/logic'

const setsWithValuesSelector = state => get(state, 'form.sets.values', {})
const disabledSetKeySelector = state => get(state, 'app.disabled', [])
const trialsSelector = state => get(state, 'app.trials', [])
const matchTypeSelector = state => get(state, 'app.matchType', 'broad')
const noticeSelector = state => get(state, 'app.notice', {})
const copySettingsSelector = state => get(state, 'app.copySettings', {})
const ipSelector = state => get(state, 'app.ip', null)

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

export const getEnabledSets = createSelector(
  [setsWithValuesSelector, disabledSetKeySelector],
  (setsWithValues, disabledSetKeys) => {
    const sortedKeys = Object.keys(setsWithValues).sort(
      (a, b) => removeSetPrefix(a) - removeSetPrefix(b)
    )
    return sortedKeys.reduce((acc, cur) => {
      const result = acc
      if (disabledSetKeys.includes(cur)) return result
      result[cur] = setsWithValues[cur]
      return result
    }, {})
  }
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
