const { createHashId } = require('@cjo3/shared/raw/general')

const skillCategory = {
  language: 0,
  front: 1,
  back: 2,
  tool: 3,
  aws: 4,
  design: 5,
  marketing: 6
}

exports.resume = {
  path: '/resume',
  filename: 'resume',
  content: [
    'DEEP DIVE INTO MY RESUME CREDENTIALS',
    'DOWNLOAD RESUME',
    'COLOR',
    'GREY',
    'work<br/>history',
    [
      {
        key: createHashId(),
        title: 'Software Engineer',
        subtitle: 'HaruInvest',
        period: 'October 2019 to March 2020',
        logo: 'haru',
        bullets: [
          {
            key: createHashId(),
            label: 'Built React UI components using context and hooks'
          },
          {
            key: createHashId(),
            label: 'Implemented CDN static files'
          }
        ]
      },
      {
        key: createHashId(),
        title: 'Chief Technology Officer',
        subtitle: 'Blockchain Infrastructure Research',
        period: 'October 2018 to September 2019',
        logo: 'bir',
        bullets: [
          {
            key: createHashId(),
            label: 'Blockchain app research'
          },
          {
            key: createHashId(),
            label: '600+ GPU crypto mine manager'
          },
          {
            key: createHashId(),
            label: 'Speaker at 2019 MPWR Crypto Mining Summit'
          }
        ]
      },
      {
        key: createHashId(),
        title: 'Junior Full Stack Developer',
        subtitle: 'Apollo Insurance',
        period: 'July 2018 to September 2018',
        logo: 'apollo',
        bullets: [
          {
            key: createHashId(),
            label:
              'Built white-label React app using Material-UI and Redux Saga'
          },
          {
            key: createHashId(),
            label:
              'Wrote pricing algorithm and integrated Stripe payment system'
          }
        ]
      },
      {
        key: createHashId(),
        title: 'SEO Analyst',
        subtitle: 'Jumpfactor Marketing',
        period: 'October 2016 to December 2016',
        logo: 'jumpfactor',
        bullets: [
          {
            key: createHashId(),
            label: 'Content marketing strategy'
          },
          {
            key: createHashId(),
            label: 'Technical on-page SEO analysis'
          }
        ]
      },
      {
        key: createHashId(),
        title: 'Production Graphic Designer',
        subtitle: 'Europtimum',
        period: 'February 2015 to July 2016',
        logo: 'europtimum',
        bullets: [
          {
            key: createHashId(),
            label:
              'Produced technical drawings for corporate way-finding, signage and merchandise projects'
          },
          {
            key: createHashId(),
            label: 'Prepared large-scale artwork for production'
          }
        ]
      }
    ],
    'completed<br/>eduction',
    [
      {
        key: createHashId(),
        title: 'Blockchain Developer Bootcamp',
        subtitle: 'Dapp University',
        period: '2018',
        logo: 'dappu'
      },
      {
        key: createHashId(),
        title: 'Developer Bootcamp',
        subtitle: 'CodeCore College',
        period: '2017',
        logo: 'codecore'
      },
      {
        key: createHashId(),
        title: 'Advanced SEO',
        subtitle: 'Juno College',
        period: '2016',
        logo: 'juno'
      },
      {
        key: createHashId(),
        title: 'Bachelor of Commerce Marketing',
        subtitle: 'UBC Sauder School of Business',
        period: '2014',
        logo: 'sauder'
      },
      {
        key: createHashId(),
        title: 'Advanced Diploma Graphic Design',
        subtitle: 'The Art Institute of Vancouver',
        period: '2007',
        logo: 'ai'
      }
    ],
    'personal<br/>details',
    [
      {
        key: createHashId(),
        label: 'Native-English speaker'
      },
      {
        key: createHashId(),
        label: 'Canadian citizen'
      },
      {
        key: createHashId(),
        label: 'Full work status in Canada and Korea'
      },
      {
        key: createHashId(),
        label: 'Intermediate Korean language skills'
      },
      {
        key: createHashId(),
        label: 'Remote work OK'
      },
      {
        key: createHashId(),
        label: 'Willing to relocate'
      },
      {
        key: createHashId(),
        label: 'Open to travel'
      },
      {
        key: createHashId(),
        label: 'Reliable vehicle'
      }
    ],
    'software stack<br/>proficiency',
    [
      {
        key: createHashId(),
        label: 'JavaScript',
        category: skillCategory.language,
        level: 7
      },
      {
        key: createHashId(),
        label: 'TypeScript',
        category: skillCategory.language,
        level: 3
      },
      {
        key: createHashId(),
        label: 'NodeJs',
        category: skillCategory.language,
        level: 6
      },
      {
        key: createHashId(),
        label: 'Solidity',
        category: skillCategory.language,
        level: 3
      },
      {
        key: createHashId(),
        label: 'Bash',
        category: skillCategory.language,
        level: 5
      },
      {
        key: createHashId(),
        label: 'React',
        category: skillCategory.front,
        level: 7
      },
      {
        key: createHashId(),
        label: 'Redux',
        category: skillCategory.front,
        level: 6
      },
      {
        key: createHashId(),
        label: 'Web3',
        category: skillCategory.front,
        level: 4
      },
      {
        key: createHashId(),
        label: 'HTML 5',
        category: skillCategory.front,
        level: 8
      },
      {
        key: createHashId(),
        label: 'CSS 3',
        category: skillCategory.front,
        level: 9
      },
      {
        key: createHashId(),
        label: 'JSS',
        category: skillCategory.front,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Sass',
        category: skillCategory.front,
        level: 7
      },
      {
        key: createHashId(),
        label: 'Pug',
        category: skillCategory.front,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Serverless',
        category: skillCategory.back,
        level: 6
      },
      {
        key: createHashId(),
        label: 'ExpressJs',
        category: skillCategory.back,
        level: 7
      },
      {
        key: createHashId(),
        label: 'DynamoDB',
        category: skillCategory.back,
        level: 5
      },
      {
        key: createHashId(),
        label: 'MongoDB',
        category: skillCategory.back,
        level: 6
      },
      {
        key: createHashId(),
        label: 'Postgres',
        category: skillCategory.back,
        level: 5
      },
      {
        key: createHashId(),
        label: 'IPFS',
        category: skillCategory.back,
        level: 3
      },
      {
        key: createHashId(),
        label: 'Webpack',
        category: skillCategory.tool,
        level: 7
      },
      {
        key: createHashId(),
        label: 'Babel',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Git',
        category: skillCategory.tool,
        level: 7
      },
      {
        key: createHashId(),
        label: 'GitHub',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Yarn',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: createHashId(),
        label: 'NPM',
        category: skillCategory.tool,
        level: 6
      },
      {
        key: createHashId(),
        label: 'VS Code',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Jira',
        category: skillCategory.tool,
        level: 6
      },
      {
        key: createHashId(),
        label: 'AWS JavaScript SDK',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: createHashId(),
        label: 'AWS Lambda',
        category: skillCategory.aws,
        level: 7
      },
      {
        key: createHashId(),
        label: 'AWS CloudFront',
        category: skillCategory.aws,
        level: 6
      },
      {
        key: createHashId(),
        label: 'AWS S3',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: createHashId(),
        label: 'AWS API Gateway',
        category: skillCategory.aws,
        level: 6
      },
      {
        key: createHashId(),
        label: 'AWS Route 53',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Adobe Photoshop',
        category: skillCategory.design,
        level: 8
      },
      {
        key: createHashId(),
        label: 'Adobe Illustrator',
        category: skillCategory.design,
        level: 9
      },
      {
        key: createHashId(),
        label: 'Adobe Indesign',
        category: skillCategory.design,
        level: 8
      },
      {
        key: createHashId(),
        label: 'SEO',
        category: skillCategory.marketing,
        level: 7
      },
      {
        key: createHashId(),
        label: 'PPC',
        category: skillCategory.marketing,
        level: 4
      },
      {
        key: createHashId(),
        label: 'Google Analytics',
        category: skillCategory.marketing,
        level: 6
      },
      {
        key: createHashId(),
        label: 'Google Search Console',
        category: skillCategory.marketing,
        level: 7
      }
    ]
  ]
}
