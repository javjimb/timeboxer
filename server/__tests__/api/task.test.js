const supertest = require('supertest');
const moment = require('moment');

const app = require('../../App');

const TaskService = require('../../services/taskService');

const request = supertest(app);

describe('Task', () => {

    it('should be able to get a list of tasks', async () => {

        // use the service to create some tasks
        TaskService.createTask({'name' : 'Task 1'});
        TaskService.createTask({'name' : 'Task 2'});
        TaskService.createTask({'name' : 'Task 3'});

        const response = await request.get('/tasks');

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(3);
    });

    it('should be able to get a single task by its id', async () => {

        let timestamp = moment.now();

        // use the service to create a task with all details
        let task = await TaskService.createTask({
            name : 'Task 1',
            start: timestamp,
            duration: 2,
            status: "new"
        });

        const response = await request.get('/tasks/' + task._id);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Task 1');
        expect(response.body.start).toBe(timestamp);
        expect(response.body.duration).toBe(2);
        expect(response.body.status).toBe('new');
    });

    it('should get 404 status code when fetching non existing id', async () => {

        const response = await request.get('/tasks/invalid-id');

        expect(response.status).toBe(404);
    });

    it('should not be able to create task without a name', async () => {
        const response = await request.post('/tasks').send({});

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Task name cannot be empty');
    });

    it('should be able to create task', async () => {
        const response = await request.post('/tasks').send({
            name: 'Jest new task',
            duration: '1',
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Jest new task');
        expect(response.body.duration).toBe(1);
    });

    it('should not be able to update task with invalid values', async () => {

        const task = await TaskService.createTask({ name: 'Task test'});

        const response = await request.put('/tasks/' + task._id).send({
            name: '',
            status: 'banana'
        });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);
    });

    it('should be able to update a task', async () => {

        const task = await TaskService.createTask({ name: 'Task test'});

        const response = await request.put('/tasks/' + task._id).send({
            name: 'Name change'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Name change');
    });

    it('should be able to delete task', async () => {

        const task = await TaskService.createTask({ name: 'Task test'});

        const response = await request.delete('/tasks/' + task._id).send({
            id: task._id,
        });

        expect(response.status).toBe(200);

        // make sure the task has been deleted
        const result = await TaskService.getTaskById(task._id);
        expect(result).toBeNull();
    });

    it('should be able to get a list of tasks between dates', async () => {

        let now = moment();
        let fromTimestamp = now.startOf('day').unix();
        let toTimestamp = now.endOf('day').unix();

        // use the service to create some tasks
        TaskService.createTask({name : 'Task 1'}); // not scheduled
        // scheduled within timestamps defined above
        TaskService.createTask({name : 'Task 2', start: fromTimestamp + 3600, end: fromTimestamp + 3600 *2, status: 'scheduled' });
        // scheduled outside of the range
        TaskService.createTask({name : 'Task 3', start: fromTimestamp - 3600 *2, end: fromTimestamp - 3600 *4, status: 'scheduled' });

        // should return only one of the tasks
        let response = await request.get('/tasks?fromTimestamp=' + fromTimestamp + '&untilTimestamp=' + toTimestamp);
        expect(response.body.tasks).toHaveLength(1);

        // should return only two of the tasks
        response = await request.get('/tasks?status=scheduled');
        expect(response.body.tasks).toHaveLength(2);
    });
});
