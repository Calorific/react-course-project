const { Schema, model} = require('mongoose')

const schema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  completedMeetings: Number,
  image: String,
  profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
  qualities: [{ type: Schema.Types.ObjectId, ref: 'Profession' }],
  rate: Number,
  sex: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  favourites: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

module.exports = model('User', schema)


