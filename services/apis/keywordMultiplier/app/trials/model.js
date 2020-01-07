const { Schema, model } = require('mongoose')
const { ipAddress } = require('@colin30/services-shared/regexPatterns')

const schema = new Schema(
  {
    ip: {
      type: String,
      required: [true, 'required'],
      minlength: [8, 'Must be at least 8 characters'],
      trim: true,
      validate: {
        validator: input => ipAddress.test(input),
        message: '{VALUE} is not a valid ip address'
      }
    },
    sets: {
      type: Map,
      of: String,
      required: [true, 'required']
    },
    slug: {
      type: String,
      required: [true, 'required'],
      minLength: [15, 'Invalid slug'],
      maxLength: [15, 'Invalid slug'],
      trim: true,
      index: true
    }
  },
  { timestamps: true }
)

const TrialsModel = model('Trials', schema)

module.exports = TrialsModel
