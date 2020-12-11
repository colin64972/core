const { createHashId } = require('@cjo3/shared/raw/general')
const localEnv = require('dotenv').config()

exports.apps = [
  'LIVE APP PORTFOLIO AND CODE SAMPLES',
  [
    {
      key: createHashId(),
      angleDir: 'left',
      title: 'Resume<br/>Website',
      description:
        'My new resume website for 2021. Designed from scratch with Adobe Illustrator, coded by hand and deployed on AWS. Features bold mobile-first design and a custom server-side rendering solution for accurate indexing. Component and module splitting allows for quick load times and static-file cache control while offloading content to DynamoDB further reduces bundle size. Content form app sends emails directly via AWS Simple Email Service.',
      liveUrl: '/',
      githubUrl: localEnv.parsed.NCA_GITHUB_URL,
      assetIconCode: 'nca',
      stackList: [
        'TypeScript',
        'React',
        'Redux',
        'Material-UI',
        'React Loadable',
        'Webpack',
        'Babel',
        'Serverless',
        'AWS DynamoDB',
        'AWS SES'
      ]
    },
    {
      key: createHashId(),
      angleDir: 'right',
      title: 'Detection<br/>Limit<br/>Editor',
      description:
        'Detection Limit Editor is a utility app purpose-built for quickly converting spreadsheet data received from analytical testing labs. 9 times out of 10, data sheets from sample testing will contain text values which must be converted to numbers to be useful. Detection Limit Editor provides this functionality through a browser-based React app where users can upload, process and export transformed data sheets in a few simple steps.',
      liveUrl: localEnv.parsed.DLE_URL,
      githubUrl: localEnv.parsed.DLE_GITHUB_URL,
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
        'Keyword Multiplier is an app made to help online marketers with keyword research. Users can quickly multiply keywords together to generate patterned search phrases which are helpful to fine-tune search query language and even discover new targeting opportunities. This app also allows users to purchase keyword metrics for their results thanks to a third-party API integration.',
      liveUrl: localEnv.parsed.KM_URL,
      githubUrl: localEnv.parsed.KM_GITHUB_URL,
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
        'NEB Token is a standard ERC-20 token implementation deployed on the Rinkeby Ethereum test network. The app is a full featured Ethereum token exchange where users can post buy or sell orders for NEB Tokens. Trades are filled manually and all interactions are preformed by the Ethereum Smart Contracts. Users must be signed in to MetaMask in order to view the app.',
      liveUrl: localEnv.parsed.NT_URL,
      githubUrl: localEnv.parsed.NT_GITHUB_URL,
      assetIconCode: 'nt',
      stackList: [
        'JavaScript',
        'Solidity',
        'Web3',
        'Truffle',
        'React',
        'Redux',
        'Material-UI',
        'MetaMask',
        'Webpack',
        'Babel'
      ]
    }
  ]
]
