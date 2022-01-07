const express = require('express');
const router = express.Router();

// GET requestfor all items
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling GET requests for all items'
    })
});

// GET request for one item
router.get('/:itemId', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling GET requests for one item'
    })
});

// POST request for creating an item
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling POST requests'
    })
});

// PATCH request for modifiying and item
router.patch('/:itemId', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling PATCH requests'
    })
});

// DELETE request for deleting an item
router.delete('/:itemId', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling DELETE requests'
    })
});

module.exports = router;