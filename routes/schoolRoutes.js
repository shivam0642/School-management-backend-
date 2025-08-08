const express = require('express')
const { addSchoolController, getSchoolsController } = require('../controller/SchoolController')

const router = express.Router()

//ADD SCHOOLS ROUTER
router.post('/addSchool',addSchoolController)

//GET ALL SCHOOLS ROUTER
router.get('/getSchools',getSchoolsController)

module.exports = router