const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  collegeId: { type: String, required: true },
  name: { type: String, required: true }, // project name must not have spaces, the words must be separated by hypens
  description: { type: String, required: true },
  tags: [{ type: String }],
  numStars: { type: Number, default: 0 },
  numContributors: { type: Number, default: 0 }
})

module.exports = mongoose.model('Project', projectSchema)