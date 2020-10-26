require('dotenv').config()
const path = require('path')

module.exports = {
  fileName: 'index.html',
  templatePath: path.resolve('src', 'templates', 'home.pug'),
  locals: {
    title: 'Accusam ipsum kasd lorem sit takimata dolore',
    heading: process.env.BRAND_NAME,
    copy:
      'Et amet et sanctus sea eos. Stet aliquyam ea diam ipsum sadipscing eos dolores, kasd stet dolore clita diam erat ipsum kasd. Voluptua tempor et dolores et aliquyam dolores. Et sit est invidunt sadipscing consetetur takimata justo rebum, erat stet duo tempor aliquyam voluptua aliquyam aliquyam accusam sit. Stet eirmod.'
  }
}
