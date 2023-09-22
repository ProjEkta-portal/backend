const Project = require("../models/project.model")

const getProjectByUserIdAndProjectName = async (req, res, next) => {
  const userId = req.params.userId;
  const projectName = req.params.projectName;
  const projectId = userId + "/" + projectName;
  let project;

  try {
    project = await Project.findOne({ projectId });
  }
  catch (err) {
    const error = new Error('Something went wrong in getProjectById');
    res.status(500);
    return next(error);
  }

  if (!project) {
    const error = new Error('Could not find the project')
    res.status(404);
    return next(error);
  }

  res.json(project.toObject());
}

exports.getProjectByUserIdAndProjectName = getProjectByUserIdAndProjectName;