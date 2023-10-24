const express = require('express')
const {auth} = require('../middleware/auth')
const {getAllEmployees, addEmployee, removeEmployee, editEmployee, getEmployee} = require('../controllers/employees')

const router = express.Router()

router.get('/', auth, getAllEmployees)
router.get('/:id', auth, getEmployee)
router.post('/add', auth, addEmployee)
router.post('/remove/:id', auth, removeEmployee)
router.put('/edit/:id', auth, editEmployee)

module.exports = router
