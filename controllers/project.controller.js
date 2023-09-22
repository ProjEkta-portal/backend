const Project = require("../models/project.model")

const getProjects = async (req, res, next) => {
  let projects;

  try {
    projects = await Project.find();
  }
  catch (err) {
    const error = new Error('Something went wrong in the server inside getProjects');
    res.status(500);
    return next(error);
  }

  if (!projects || projects.length === 0) {
    const error = new Error('Could not find any projects');
    res.status(404);
    return next(error)
  }

  res.json(projects.map(project => project.toObject({ getters: true })));
}

const createProject = async (req, res, next) => {
  const { userId, collegeId, name, description, tags } = req.body;

  const createdProject = new Project({
    projectId: userId + "/" + name,
    userId,
    collegeId,
    name,
    description,
    tags
  });

  try {
    await createdProject.save();
  }
  catch (err) {
    const error = new Error('Unable to create a new project');
    res.status(500);
    return next(error);
  }

  res.status(201).json(createdProject.toObject());
}

exports.getProjects = getProjects;
exports.createProject = createProject;