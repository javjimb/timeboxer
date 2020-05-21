// Library
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Services
import TaskService from '../services/TaskService';

// Components
import Scheduler from '../components/schedule/Scheduler';
import AddTask from '../components/tasks/AddTask';
import ScheduledTaskList from '../components/tasks/ScheduledTaskList';
import TBAppBar from '../components/TBAppBar';

const _ = require('lodash');
const moment = require('moment');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
}));

export default function Main() {
    const classes = useStyles();
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [newTaskList, setNewTaskList] = useState([]);
    const [startTimestamp, setStartTimestamp] = useState(
        moment().startOf('day').unix()
    );
    const [endTimestamp, setEndTimestamp] = useState(
        moment().endOf('day').unix()
    );

    const schedulerRef = React.createRef();

    /**
     * Callback when the scheduler dates are changed
     */
    const onDateChange = (data) => {
        setStartTimestamp(moment(data.view.activeStart).unix());
        setEndTimestamp(moment(data.view.activeEnd).unix());
        //console.log('Date has changed: ', startTimestamp, endTimestamp);
        TaskService.getAllTasks({ fromTimestamp: startTimestamp, untilTimestamp: endTimestamp})
            .then((response) => setTaskList(response.tasks))
            .catch((error) => console.error(error));
    };

    const goToNext = () => {
        let scheduler = schedulerRef.current;
        scheduler.next();
    };

    const goToPrevious = () => {
        let scheduler = schedulerRef.current;
        scheduler.previous();
    };

    const goToToday = () => {
        let scheduler = schedulerRef.current;
        scheduler.today();
    };

    const taskChangeHandler = (event) => {
        setTask(event.target.value);
    };
    const durationChangeHandler = (event) => {
        setDuration(event.target.value);
    };
    const createNewTask = (event) => {
        event.preventDefault();
       TaskService.createNewTask(task, duration)
            .then((response) => {
                setNewTaskList([...newTaskList, response]);
                setTask('');
                setDuration(0);
            })
            .catch((error) => console.log(error));
    };
    const deleteTask = (id) => {
       TaskService.deleteTask(id)
            .then(() =>
                setNewTaskList(newTaskList.filter((task) => task._id !== id))
            )
            .catch((error) => console.log(error));
    };

    const updateTask = (id, newData) => {
        // update the task in the database
        TaskService.updateTask(id, newData)
            .then((updatedTask) => {
                setTaskList(
                    taskList.map((task) =>
                        task._id === id ? _.extend(updatedTask) : task
                    )
                );
                setNewTaskList(
                    newTaskList.map((task) =>
                        task._id === id ? _.extend(updatedTask) : task
                    )
                );
            })
            .catch((err) => {
                // TODO: create a global error handler
                console.error(err);
            });
    };

    const updateTaskStatus = (id, oldStatus, newStatus) => {
        // update the task in the database
        TaskService.updateTask(id, { status: newStatus })
            .then((updatedTask) => {
                // Update our lists in the state to react to the new status
                switch (oldStatus) {
                    case 'scheduled':
                        if (newStatus === 'completed') {
                            setTaskList(
                                taskList.map((task) =>
                                    task._id === id
                                        ? _.extend(updatedTask)
                                        : task
                                )
                            );
                        } else if (newStatus === 'new') {
                            TaskService.updateTask(id, {
                                start: 0,
                                end: 0,
                            }).then((response) => {
                                setNewTaskList([...newTaskList, response]);
                                setTaskList(
                                    taskList.filter((task) => task._id !== id)
                                );
                            });
                        }
                        break;
                    case 'new':
                        setNewTaskList(
                            newTaskList.filter((task) => task._id !== id)
                        );
                        setTaskList([...taskList, updatedTask]);
                        break;
                    case 'completed':
                        setNewTaskList([...newTaskList, updatedTask]);
                        setTaskList(taskList.filter((task) => task._id !== id));
                        break;
                }
            })
            .catch((err) => {
                // TODO: create a global error handler
                console.error(err);
            });
    };

    useEffect(() => {
     

        TaskService.getAllTasks({ fromTimestamp: startTimestamp })
            .then((response) => setTaskList(response.tasks))
            .catch((error) => console.error(error));

        TaskService.getAllTasks({ status: 'new' })
            .then((response) => setNewTaskList(response.tasks))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <TBAppBar next={goToNext} prev={goToPrevious} today={goToToday} />
            <div id='task-list' className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <AddTask
                                task={task}
                                duration={duration}
                                createNewTask={createNewTask}
                                taskChangeHandler={taskChangeHandler}
                                durationChangeHandler={durationChangeHandler}
                                taskList={newTaskList}
                                deleteTask={deleteTask}
                            />
                            <ScheduledTaskList
                                taskList={taskList}
                                updateTaskStatus={updateTaskStatus}
                            />
                        </Paper>
                        {/* <Paper className={classes.paper}></Paper> */}
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            <Scheduler
                                taskList={taskList}
                                updateTask={updateTask}
                                updateTaskStatus={updateTaskStatus}
                                onDateChange={(start, end) =>
                                    onDateChange(start, end)
                                }
                                ref={schedulerRef}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
