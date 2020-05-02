import { internet } from 'faker'

const generateKey = () => internet.password()

const setTemplateLocals = (args = {}) => ({
  ...args,
  noScript: 'Please enable JavaScript to view this webpage'
})

export default {
  generateKey,
  setTemplateLocals
}
