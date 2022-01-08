const mongoose = require('mongoose');

// Importing the schema
const Item = require('../models/item');


/**
 * @controller GET /items
 * @desc Get all items from the inventory
 */
const items_GET_All = (req, res, next) => {
    Item.find()
        .select('name price count _id')
        .exec()
        .then(docs => {
            const response = {
                length: docs.length,
                items: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        count: doc.count,
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
};


/**
 * @controller GET /items/:itemId
 * @desc Get a single item
 */
const items_GET_One = (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id)
        .select('name price count _id')
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
};


/**
 * @controller POST /items
 * @desc Create a new item
 */
const items_POST = (req, res, next) => {

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        count: req.body.count
    });

    item
        .save()
        .then(res => {
            const newItem = res;
            //console.log(newItem);
        })
        .catch(err => console.log(err))
    res.status(201).json({
        message: 'Created an item using POST request',
        createdItem: item
    });
};


/**
 * @controller PATCH /item/:itemId
 * @desc Update a value for an item
 */
const items_PATCH = (req, res, next) => {
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
};


/**
 * @controller DELETE /items/:itemId
 * @desc Delete an item
 */
const items_DELETE = (req, res, next) => {
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
};


// Exporting all controllers
module.exports = {
    items_GET_All,
    items_GET_One,
    items_POST,
    items_PATCH,
    items_DELETE
}