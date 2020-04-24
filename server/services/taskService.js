const TaskModel = require('../models/Task');

class TaskService {

    async getTasks(filter) {
        let tasks = await TaskModel.find(filter);
        return tasks;
    }

    async getTaskById(task_id) {
        return await TaskModel.findById(task_id);
    }

    async createTask(task) {

        let newTask = await TaskModel.create(task);
        return newTask;
    }

    async deleteTask(task_id) {

        let task = await this.getTaskById(task_id);

        await TaskModel.findByIdAndRemove(task_id);

        return task;
    }

    async updateTask(task_id, update) {

        let task = await TaskModel.findByIdAndUpdate(task_id, update, { new: true, runValidators: true });

        return task;
    }
}

module.exports = new TaskService();

