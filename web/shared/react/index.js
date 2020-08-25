import { internet } from 'faker'

export const generateKey = () => internet.password()
