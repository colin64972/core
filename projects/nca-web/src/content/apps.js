const { createHashId } = require('@cjo3/shared/raw/general')
const localEnv = require('dotenv').config()

exports.apps = [
  'JAVASCRIPT APP<br/>PORTFOLIO WITH<br/>GITHUB CODE',
  'image-apps',
  [
    {
      key: createHashId(),
      angleDir: 'left',
      title: 'Resume<br/>Website',
      description:
        'My new resume website for 2021. Designed from scratch with Adobe Illustrator, coded by hand and deployed on AWS. Features bold mobile-first design and a custom server-side rendering solution for accurate indexing. Component and module splitting allows for speedy load times with modules distributed on AWS CloudFront. Content form app sends emails directly via AWS Simple Email Service.',
      liveUrl: '/',
      githubUrl: localEnv.parsed.GITHUB_URL_NCA,
      assetIconCode: 'nca',
      stackList: [
        'TypeScript',
        'React',
        'Redux',
        'Material-UI',
        'Webpack',
        'Babel',
        'Serverless',
        'AWS SES'
      ]
    },
    {
      key: createHashId(),
      angleDir: 'right',
      title: 'Detection<br/>Limit<br/>Editor',
      description:
        'Detection Limit Editor is a utility app purpose-built for quickly converting spreadsheet data received from analytical testing labs. Nine times out of ten, data sheets from sample testing will contain text values which must be converted to numbers in order to be useful. Detection Limit Editor provides a way to convert detection limit text values to number values through a browser-based React app. Users can upload, process and export transformed data sheets in a few simple steps.',
      liveUrl: localEnv.parsed.APP_URL_DLE,
      githubUrl: localEnv.parsed.GITHUB_URL_DLE,
      assetIconCode: 'dle',
      stackList: [
        'TypeScript',
        'React',
        'Redux',
        'Material-UI',
        'SheetsJs',
        'Stripe',
        'Webpack',
        'Babel',
        'Serverless',
        'AWS'
      ]
    },
    {
      key: createHashId(),
      angleDir: 'left',
      title: 'Keyword<br/>Multiplier',
      description:
        'Keyword Multiplier is an app to help online marketers with keyword research. Users can quickly  generate patterned search phrases which are useful for fine-tuning search query language and even discovering new targeting opportunities. Keyword Multiplier also allows users to purchase keyword metrics for their results thanks to a third-party API integration.',
      liveUrl: localEnv.parsed.APP_URL_KM,
      githubUrl: localEnv.parsed.GITHUB_URL_KM,
      assetIconCode: 'km',
      stackList: [
        'JavaScript',
        'React',
        'Redux',
        'Material-UI',
        'Stripe',
        'Webpack',
        'Babel',
        'Serverless',
        'AWS'
      ]
    },
    {
      key: createHashId(),
      angleDir: 'right',
      title: 'NEB<br/>Token',
      description:
        'NEB Token is a standard ERC-20 token implementation deployed on the Rinkeby Ethereum test network. The app is a full-featured Ethereum token exchange where users can post buy or sell orders for NEB Tokens. Trades are filled manually and all interactions are preformed by Ethereum smart contracts. Users must be signed in to MetaMask in order to view the app.',
      liveUrl: localEnv.parsed.APP_URL_NEBT,
      githubUrl: localEnv.parsed.GITHUB_URL_NEBT,
      assetIconCode: 'nebt',
      stackList: [
        'JavaScript',
        'Solidity',
        'Web3',
        'Truffle',
        'Infura',
        'React',
        'Redux',
        'Material-UI',
        'Webpack',
        'Babel'
      ]
    }
  ]
]
