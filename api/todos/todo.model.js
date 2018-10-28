'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    priority : {
        type: String
    },
    fileName : {
        type: String
    },
    file : {
        type: Object
    }

},{
    id: false,
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: { 
        virtuals: true,
        getters: true, 
        setters: false 
    },
    timestamps: true
});

TodoSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Todo', TodoSchema);