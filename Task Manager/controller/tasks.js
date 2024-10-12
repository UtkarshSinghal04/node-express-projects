const Tasks = require('../models/tasks.js');

const get_all_item = async (req, res) => {
    try {
        const task = await Tasks.find({});
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const create_item = async (req, res) => {
    try {
        const task = await Tasks.create(req.body);
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(500).send({ msg: err });
    }
}

const get_an_item = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Tasks.findOne({ _id: taskID });
        if (!task) {
            //it is imp to return here , otherwise the below code will execute , and it will look for task
            return res.status(404).json(`No task with id: ${taskID} exist`);
        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const update_item = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body,
            {
                new: true,
                runValidators: true
            })
        if(!task)
        return res.status(400).json(`no task with id: ${taskID} exist`)

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const delete_item = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Tasks.findOneAndDelete({ _id: taskID });

        if (!task) {
            //it is imp to return here , otherwise the below code will execute , and it will look for task
            return res.status(400).json(`no task with id: ${taskID} exist`);
        }

        const alltask = await Tasks.find();
        res.status(200).json(alltask);
        // res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

console.log("this is task from controller");

module.exports = {
    get_all_item,
    create_item,
    get_an_item,
    update_item,
    delete_item
}