const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const {
    commend_delete,
    commend_get,
    commend_register,
    commend_update
} = require('../controller/commend')

// get commend
router.get('/:commendId', checkAuth, commend_get)

// register commend
router.post('/', checkAuth, commend_register)

// update commend
router.patch('/:commendId', checkAuth, commend_update)

// delete commend()
router.delete('/:commendId', checkAuth, commend_delete)

module.exports = router