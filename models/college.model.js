const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
  collegeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true }
})

module.exports = mongoose.model('College', collegeSchema)