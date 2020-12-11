const { createHashId } = require('@cjo3/shared/raw/general')
const { skillCategories } = require('@cjo3/shared/raw/constants/nca')

exports.resume = [
  'DEEP DIVE INTO MY RESUME CREDENTIALS',
  'image-resume',
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
          label: 'Built white-label React app using Material-UI and Redux Saga'
        },
        {
          key: createHashId(),
          label: 'Wrote pricing algorithm and integrated Stripe payment system'
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
      category: skillCategories.indexOf('language'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'TypeScript',
      category: skillCategories.indexOf('language'),
      level: 3
    },
    {
      key: createHashId(),
      label: 'NodeJs',
      category: skillCategories.indexOf('language'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'Solidity',
      category: skillCategories.indexOf('language'),
      level: 3
    },
    {
      key: createHashId(),
      label: 'Bash',
      category: skillCategories.indexOf('language'),
      level: 5
    },
    {
      key: createHashId(),
      label: 'React',
      category: skillCategories.indexOf('front'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'Redux',
      category: skillCategories.indexOf('front'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'Web3',
      category: skillCategories.indexOf('front'),
      level: 4
    },
    {
      key: createHashId(),
      label: 'HTML 5',
      category: skillCategories.indexOf('front'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'CSS 3',
      category: skillCategories.indexOf('front'),
      level: 9
    },
    {
      key: createHashId(),
      label: 'JSS',
      category: skillCategories.indexOf('front'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Sass',
      category: skillCategories.indexOf('front'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'Pug',
      category: skillCategories.indexOf('front'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Serverless',
      category: skillCategories.indexOf('back'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'ExpressJs',
      category: skillCategories.indexOf('back'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'DynamoDB',
      category: skillCategories.indexOf('back'),
      level: 5
    },
    {
      key: createHashId(),
      label: 'MongoDB',
      category: skillCategories.indexOf('back'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'Postgres',
      category: skillCategories.indexOf('back'),
      level: 5
    },
    {
      key: createHashId(),
      label: 'IPFS',
      category: skillCategories.indexOf('back'),
      level: 3
    },
    {
      key: createHashId(),
      label: 'Webpack',
      category: skillCategories.indexOf('tool'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'Babel',
      category: skillCategories.indexOf('tool'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Git',
      category: skillCategories.indexOf('tool'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'GitHub',
      category: skillCategories.indexOf('tool'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Yarn',
      category: skillCategories.indexOf('tool'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'NPM',
      category: skillCategories.indexOf('tool'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'VS Code',
      category: skillCategories.indexOf('tool'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Jira',
      category: skillCategories.indexOf('tool'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'AWS JavaScript SDK',
      category: skillCategories.indexOf('aws'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'AWS Lambda',
      category: skillCategories.indexOf('aws'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'AWS CloudFront',
      category: skillCategories.indexOf('aws'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'AWS S3',
      category: skillCategories.indexOf('aws'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'AWS API Gateway',
      category: skillCategories.indexOf('aws'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'AWS Route 53',
      category: skillCategories.indexOf('aws'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Adobe Photoshop',
      category: skillCategories.indexOf('design'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'Adobe Illustrator',
      category: skillCategories.indexOf('design'),
      level: 9
    },
    {
      key: createHashId(),
      label: 'Adobe Indesign',
      category: skillCategories.indexOf('design'),
      level: 8
    },
    {
      key: createHashId(),
      label: 'SEO',
      category: skillCategories.indexOf('marketing'),
      level: 7
    },
    {
      key: createHashId(),
      label: 'PPC',
      category: skillCategories.indexOf('marketing'),
      level: 4
    },
    {
      key: createHashId(),
      label: 'Google Analytics',
      category: skillCategories.indexOf('marketing'),
      level: 6
    },
    {
      key: createHashId(),
      label: 'Google Search Console',
      category: skillCategories.indexOf('marketing'),
      level: 7
    }
  ]
]
