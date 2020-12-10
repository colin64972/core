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
        key: 'iJEzwzYLgw',
        title: 'Software Engineer',
        subtitle: 'HaruInvest',
        period: 'October 2019 to March 2020',
        logo: 'haru',
        bullets: [
          {
            key: 'hTWxprXCHx',
            label: 'Built React UI components using context and hooks'
          },
          {
            key: 'PluhYYWxgh',
            label: 'Implemented CDN static files'
          }
        ]
      },
      {
        key: 'KeeNQDBntV',
        title: 'Chief Technology Officer',
        subtitle: 'Blockchain Infrastructure Research',
        period: 'October 2018 to September 2019',
        logo: 'bir',
        bullets: [
          {
            key: 'XqOkqSlGMi',
            label: 'Blockchain app research'
          },
          {
            key: 'SkHvMgeqOr',
            label: '600+ GPU crypto mine manager'
          },
          {
            key: 'HGBGUNEnke',
            label: 'Speaker at 2019 MPWR Crypto Mining Summit'
          }
        ]
      },
      {
        key: 'SnEpuVdWea',
        title: 'Junior Full Stack Developer',
        subtitle: 'Apollo Insurance',
        period: 'July 2018 to September 2018',
        logo: 'apollo',
        bullets: [
          {
            key: 'SzhJrvWFwk',
            label:
              'Built white-label React app using Material-UI and Redux Saga'
          },
          {
            key: 'kMnMxbNITu',
            label:
              'Wrote pricing algorithm and integrated Stripe payment system'
          }
        ]
      },
      {
        key: 'PxrBBvQalC',
        title: 'SEO Analyst',
        subtitle: 'Jumpfactor Marketing',
        period: 'October 2016 to December 2016',
        logo: 'jumpfactor',
        bullets: [
          {
            key: 'yuXdtNVpLF',
            label: 'Content marketing strategy'
          },
          {
            key: 'kELhqPIBeq',
            label: 'Technical on-page SEO analysis'
          }
        ]
      },
      {
        key: 'BmzdBxvXhX',
        title: 'Production Graphic Designer',
        subtitle: 'Europtimum',
        period: 'February 2015 to July 2016',
        logo: 'europtimum',
        bullets: [
          {
            key: 'OaMGkFYvpg',
            label:
              'Produced technical drawings for corporate way-finding, signage and merchandise projects'
          },
          {
            key: 'VqJUdDYePD',
            label: 'Prepared large-scale artwork for production'
          }
        ]
      }
    ],
    'completed<br/>eduction',
    [
      {
        key: 'UtOlMUeAJG',
        title: 'Blockchain Developer Bootcamp',
        subtitle: 'Dapp University',
        period: '2018',
        logo: 'dappu'
      },
      {
        key: 'pwofdLfWpb',
        title: 'Developer Bootcamp',
        subtitle: 'CodeCore College',
        period: '2017',
        logo: 'codecore'
      },
      {
        key: 'xLZKZchHrk',
        title: 'Advanced SEO',
        subtitle: 'Juno College',
        period: '2016',
        logo: 'juno'
      },
      {
        key: 'qhkFqpFCQY',
        title: 'Bachelor of Commerce Marketing',
        subtitle: 'UBC Sauder School of Business',
        period: '2014',
        logo: 'sauder'
      },
      {
        key: 'WtvAtJAEAE',
        title: 'Advanced Diploma Graphic Design',
        subtitle: 'The Art Institute of Vancouver',
        period: '2007',
        logo: 'ai'
      }
    ],
    'personal<br/>details',
    [
      {
        key: 'tAwgqOtaRy',
        label: 'Native-English speaker'
      },
      {
        key: 'rxvdQnaDMr',
        label: 'Canadian citizen'
      },
      {
        key: 'TpmitihOBH',
        label: 'Full work status in Canada and Korea'
      },
      {
        key: 'IbmELsFccz',
        label: 'Intermediate Korean language skills'
      },
      {
        key: 'SWEJwTGDqg',
        label: 'Remote work OK'
      },
      {
        key: 'ZlAzswIHeX',
        label: 'Willing to relocate'
      },
      {
        key: 'TCdCHszwEM',
        label: 'Open to travel'
      },
      {
        key: 'NwFYqHpaAA',
        label: 'Reliable vehicle'
      }
    ],
    'software stack<br/>proficiency',
    [
      {
        key: 'NvvBoPximk',
        label: 'JavaScript',
        category: skillCategory.language,
        level: 7
      },
      {
        key: 'VUvCTsWYir',
        label: 'TypeScript',
        category: skillCategory.language,
        level: 3
      },
      {
        key: 'aNWptVMWia',
        label: 'NodeJs',
        category: skillCategory.language,
        level: 6
      },
      {
        key: 'mklXCPkOiN',
        label: 'Solidity',
        category: skillCategory.language,
        level: 3
      },
      {
        key: 'pwauBZwRKM',
        label: 'Bash',
        category: skillCategory.language,
        level: 5
      },
      {
        key: 'luTMiJmDNZ',
        label: 'React',
        category: skillCategory.front,
        level: 7
      },
      {
        key: 'JQLHmBrlNk',
        label: 'Redux',
        category: skillCategory.front,
        level: 6
      },
      {
        key: 'OOSpSyHUqF',
        label: 'Web3',
        category: skillCategory.front,
        level: 4
      },
      {
        key: 'MSfnbVasIA',
        label: 'HTML 5',
        category: skillCategory.front,
        level: 8
      },
      {
        key: 'qeyiyRZLcj',
        label: 'CSS 3',
        category: skillCategory.front,
        level: 9
      },
      {
        key: 'nAqazBiFUl',
        label: 'JSS',
        category: skillCategory.front,
        level: 8
      },
      {
        key: 'NJUZciAyCe',
        label: 'Sass',
        category: skillCategory.front,
        level: 7
      },
      {
        key: 'QhcxaDUwfC',
        label: 'Pug',
        category: skillCategory.front,
        level: 8
      },
      {
        key: 'hYiyEGYpck',
        label: 'Serverless',
        category: skillCategory.back,
        level: 6
      },
      {
        key: 'eVhnWcOVmO',
        label: 'ExpressJs',
        category: skillCategory.back,
        level: 7
      },
      {
        key: 'YyzPdImJXz',
        label: 'DynamoDB',
        category: skillCategory.back,
        level: 5
      },
      {
        key: 'oUuKEpDhiP',
        label: 'MongoDB',
        category: skillCategory.back,
        level: 6
      },
      {
        key: 'fzwDWBRTDq',
        label: 'Postgres',
        category: skillCategory.back,
        level: 5
      },
      {
        key: 'IXsqVYrtrT',
        label: 'IPFS',
        category: skillCategory.back,
        level: 3
      },
      {
        key: 'uSNXZYjYAQ',
        label: 'Webpack',
        category: skillCategory.tool,
        level: 7
      },
      {
        key: 'KcpszNDDhm',
        label: 'Babel',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: 'UcTGrlQkxR',
        label: 'Git',
        category: skillCategory.tool,
        level: 7
      },
      {
        key: 'nSFabbXvoV',
        label: 'GitHub',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: 'CVTjUdkhsI',
        label: 'Yarn',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: 'agFIPUwjFt',
        label: 'NPM',
        category: skillCategory.tool,
        level: 6
      },
      {
        key: 'IMPaSrNBFT',
        label: 'VS Code',
        category: skillCategory.tool,
        level: 8
      },
      {
        key: 'nthdtPQyRP',
        label: 'Jira',
        category: skillCategory.tool,
        level: 6
      },
      {
        key: 'sOWzUgrDzQ',
        label: 'AWS JavaScript SDK',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: 'dWSmHMNUtl',
        label: 'AWS Lambda',
        category: skillCategory.aws,
        level: 7
      },
      {
        key: 'uUcGTJcYDt',
        label: 'AWS CloudFront',
        category: skillCategory.aws,
        level: 6
      },
      {
        key: 'mUGTwHIGou',
        label: 'AWS S3',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: 'KptTnEeCis',
        label: 'AWS API Gateway',
        category: skillCategory.aws,
        level: 6
      },
      {
        key: 'nRZdaHGSvA',
        label: 'AWS Route 53',
        category: skillCategory.aws,
        level: 8
      },
      {
        key: 'qKgpXjUuFL',
        label: 'Adobe Photoshop',
        category: skillCategory.design,
        level: 8
      },
      {
        key: 'MMpZCLFwrN',
        label: 'Adobe Illustrator',
        category: skillCategory.design,
        level: 9
      },
      {
        key: 'OcrIGmjrMx',
        label: 'Adobe Indesign',
        category: skillCategory.design,
        level: 8
      },
      {
        key: 'UACApRanPq',
        label: 'SEO',
        category: skillCategory.marketing,
        level: 7
      },
      {
        key: 'lffaPXzVyC',
        label: 'PPC',
        category: skillCategory.marketing,
        level: 4
      },
      {
        key: 'tmUlZHdzBm',
        label: 'Google Analytics',
        category: skillCategory.marketing,
        level: 6
      },
      {
        key: 'rkPNLRUxKD',
        label: 'Google Search Console',
        category: skillCategory.marketing,
        level: 7
      }
    ]
  ]
}
