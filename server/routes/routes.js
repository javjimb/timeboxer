const express = require('express');

const TaskService = require('../services/taskService');

const router = new express.Router();

//routes.post('/tasks', TaskService.createTask);
router.get('/tasks', (req, res) => {
    TaskService.getTasks({}).then((result) => {
        res.send(result);
    });

});

router.get('/tasks/:id', (req, res, next) => {

    TaskService.getTaskById(req.params.id).then((result) => {
        res.send(result);
    }).catch( err => {
        res.sendStatus(404);
    });

});

router.post('/tasks', async (req, res) => {

    TaskService.createTask(req.body).then((result) => {
        res.send(result);
    });
});

router.put('/tasks/:id', async (req, res) => {

    TaskService.updateTask(req.params.id, req.body).then((result) => {
        res.send(result);
    });
});

router.delete('/tasks/:id', async (req, res) => {

    TaskService.deleteTask(req.params.id).then((result) => {
        res.send(result);
    })
});


/*
routes.post('/users', UserController.store);
routes.delete('/users', UserController.delete);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks', TaskController.delete);
*/

module.exports = router;
