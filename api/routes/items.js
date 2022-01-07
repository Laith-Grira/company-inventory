const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importing the schema
const Item = require('../models/item');


/**
 * @route GET /items
 * @desc Get all items from the inventory
 * @access Public
 */
router.get('/', (req, res, next) => {
    Item.find()
        .select('name price count image _id')
        .exec()
        .then(docs => {
            const response = {
                length: docs.length,
                items: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        count: doc.count,
                        image: doc.image,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/items/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


/**
 * @route GET /items/:itemId
 * @desc Get a single item
 * @access Public
 */
router.get('/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id)
        .select('name price count image _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "This id is not found in the database"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


/**
 * @route POST /items
 * @desc Create a new item
 * @access Public
 */
router.post('/', (req, res, next) => {

    // we will first get images as string
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        count: req.body.count,
        image: req.body.image
    });

    item
        .save()
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    res.status(201).json({
        message: 'Created an item using POST request',
        createdItem: item
    });
});


/**
 * @route PATCH /item/:itemId
 * @desc Update a value for an item
 * @access Public
 */
router.patch('/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Item.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item '+ id +' is successfully updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/items/'+id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


/**
 * @route DELETE /items/:itemId
 * @desc Delete an item
 * @access Public
 */
router.delete('/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    Item.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item '+ id +' is successfully deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:5000/items'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;