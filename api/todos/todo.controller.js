'use strict';

const Todo = require('./todo.model');

module.exports = {
    index: (req, res) => {
        Todo
        .find({})
        .exec((err, todoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Todo Details fetched Successfully", data : todoDetails});
        })
    },
    retrieve: (req, res) => {
        const todoId = req.params.id;
        Todo
        .findOne({_id:todoId})
        .exec((err, todoDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Todo Detail fetched Successfully", data : todoDetails});
        })
    },
    create: (req, res) => {

        Todo.create(req.body, (err, todoDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Todo Created Successfully", data : todoDetails});
        })
    },
    update: (req, res)=>{
        const todoId = req.params.id;
        Todo
        .findByIdAndUpdate(todoId, { $set: req.body }).exec((err, todoDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Todo updated" });
        })
    },
    delete: (req, res)=>{
        const todoId = req.params.id;
        Todo
        .remove({ _id: req.params.id }).exec((err, todoDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Todo Deleted" });
        })
    },
	download: (req,res)=>{
			console.log(req.params.id);
			console.log('---------')
        Todo
        .findOne({_id:req.params.id})
        .exec((err, todoDetails)=>{
			console.log(todoDetails);
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
				res.download('public/'+todoDetails.fileName,todoDetails.fileName);   
        })
	 
	}
}