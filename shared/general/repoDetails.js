import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '..', 'shared', '.env')
})

export const setAppsList = () => process.env.APPS_LIST.split(',')
