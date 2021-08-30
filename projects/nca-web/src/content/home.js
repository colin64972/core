const localEnv = require('dotenv').config()
const { createHashId } = require('@cjo3/shared/raw/general')

exports.home = [
  `COLIN<br/>${localEnv.parsed.APP_NAME}`,
  'full stack<br/>JavaScript<br/>design &<br/>development',
  `logo-${localEnv.parsed.APP_NAME}-white`,
  "LET'S BUILD<br/>AN ONLINE<br/>EXPERIENCE<br/>TOGETHER",
  'image-home',
  "it's not the idea, it's the commitment and execution",
  "In today’s inter–connected world, your business needs to be online with more than a basic webpage. However, building a performant, search–visible and lead–generating online experience is a complex process for even the largest of companies. With a background in graphic design, education in marketing and modern programming skills, I can help bring your brand's web presence to life with a focus on conversions and revenue generation.",
  'let me help you achieve your online goals',
  [
    {
      key: createHashId(),
      heading: 'design',
      copy:
        'The design and UI of your webpage is not superficial. Numerous studies have proven that users give more trust and credibility to well-designed, aesthetically pleasing websites. Allow me to craft you a beautiful digital experience.'
    },
    {
      key: createHashId(),
      heading: 'development',
      copy:
        'Gone are the days of static websites, you need a dynamic web application that provides rich data to users. I use modern JavaScript and NodeJs to build interactive front-end clients and data-providing back-end services.'
    },
    {
      key: createHashId(),
      heading: 'marketing',
      copy:
        'Marketing strategy should be the core of your online presence and baked into each page of your website. From content planning to technical SEO, social media and PPC, let me help you earn visibility and gain users.'
    }
  ]
]
