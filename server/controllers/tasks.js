const Task = require('../models/task.js')

module.exports = {
    index: (req, res) => {
        res.sendFile('index.html');
    },
    all: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.json({tasks: tasks});
        }
        catch (err) {
            res.json(err);
        }
    },
    one: async (req, res) => {
        let task = await Task.findById({ _id : req.params.id });
        Task.findById({ _id : req.params.id })
            .then((data) => {
                res.json({task: data})
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        const task = new Task(req.body);
        task.save()
            .then((data) => {
                res.json({newTask: data});
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Task.updateOne({ _id : req.params.id }, req.body)
            .then((data) => {
                res.json({updatedTask: data});
            })
            .catch(err => res.json(err));
    },
    delete: async (req, res) => {
        Task.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            }) ;
    },
}
