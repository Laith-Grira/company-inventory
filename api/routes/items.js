const express = require('express');
const router = express.Router();


// import the items controller
const itemsController = require('../controllers/itemsController');


/**
 * @route GET /items
 * @desc Get all items from the inventory
 * @access Public
 */
router.get('/', itemsController.items_GET_All);


/**
 * @route GET /items/:itemId
 * @desc Get a single item
 * @access Public
 */
router.get('/:itemId', itemsController.items_GET_One);


/**
 * @route POST /items
 * @desc Create a new item
 * @access Public
 */
router.post('/', itemsController.items_POST);


/**
 * @route PATCH /item/:itemId
 * @desc Update a value for an item
 * @access Public
 */
router.patch('/:itemId', itemsController.items_PATCH);


/**
 * @route DELETE /items/:itemId
 * @desc Delete an item
 * @access Public
 */
router.delete('/:itemId', itemsController.items_DELETE);


// Exporting the router
module.exports = router;