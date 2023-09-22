const express = require("express")
const router = express.Router()

const { getProjectByUserIdAndProjectName, getUsersProjects } = require("../controllers/user.controller")

router.get('/:userId/projects', getUsersProjects);
router.get('/:userId/projects/:projectName', getProjectByUserIdAndProjectName);

module.exports = router;