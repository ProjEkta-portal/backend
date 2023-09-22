const express = require("express");
const router = express.Router();

const { getColleges, getCollegeById, createCollege } = require('../controllers/college.controller')

router.get('/', getColleges);
router.get('/:collegeId', getCollegeById);
router.post('/', createCollege);

module.exports = router;