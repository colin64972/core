require('dotenv').config()
const path = require('path')
const sheetGenerator = require('../styles/sheetGenerator')
const global = require('../styles/global')

const styles = {
  ...global,
  body: {
    ...global.body,
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '@media screen and (max-width: 600px)': {
      flexFlow: 'column nowrap'
    }
  },
  heading: {
    color: '#ff2211',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  message: {
    'textAlign': 'center',
    'marginLeft': '1rem',
    '@media screen and (max-width: 600px)': {
      marginLeft: 0
    }
  }
}

const styleSheet = sheetGenerator(styles)

module.exports = {
  fileName: 'error.html',
  templatePath: path.resolve('src', 'templates', 'error.pug'),
  locals: {
    title: 'Error',
    cdnUrl: `https://${process.env.CDN_BUCKET}`,
    heading: `Error`,
    gsvTag: process.env.GSV_TAG,
    gaTag: process.env.GA_TAG,
    message: 'Sorry, something went wrong',
    styleSheet
  }
}
