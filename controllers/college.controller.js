const College = require("../models/college.model")

const getColleges = async (req, res, next) => {
  let colleges;

  try {
    colleges = await College.find();
  }
  catch (err) {
    const error = new Error('Something went wrong in the server');
    res.status(500);
    return next(error);
  }

  if (!colleges || colleges.length === 0) {
    const error = new Error('Could not find any colleges');
    res.status(404);
    return next(error)
  }

  res.json(colleges.map(college => college.toObject({ getters: true })));
}

const getCollegeById = async (req, res, next) => {
  const collegeId = req.params.collegeId;
  let college;

  try {
    college = await College.findOne({ collegeId });
  }
  catch (err) {
    const error = new Error('Something went wrong in getCollegeById');
    res.status(500);
    return next(error);
  }

  if (!college) {
    const error = new Error('Could not find the college')
    res.status(404);
    return next(error);
  }

  res.json(college.toObject());
}

const createCollege = async (req, res, next) => {
  const { collegeId, name, address, state, city, description } = req.body;

  const createdCollege = new College({
    collegeId,
    name,
    address,
    state,
    city,
    description
  });

  try {
    await createdCollege.save();
  }
  catch (err) {
    const error = new Error('Unable to create a new college');
    res.status(500);
    return next(error);
  }

  res.status(201).json(createdCollege.toObject());
}

exports.getColleges = getColleges;
exports.getCollegeById = getCollegeById;
exports.createCollege = createCollege;