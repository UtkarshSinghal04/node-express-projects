const express = require('express');
const router = express.Router();

const {
    get_all_item,
    create_item,
    get_an_item,
    update_item,
    delete_item
} = require('../controller/tasks');

//method 1
router.get('/', get_all_item);
router.post('/', create_item);

//method 2
router.route('/:id').get(get_an_item).patch(update_item).delete(delete_item);

console.log("this is task from route");

module.exports = router;