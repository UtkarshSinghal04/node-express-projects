const express = require('express');
const router = express.Router();
const {getAllTask, getTaskStatic} = require('../controller/products')

router.route('/').get(getAllTask);

router.route('/static').get(getTaskStatic)

module.exports = router