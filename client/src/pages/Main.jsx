// Library
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Components
import Scheduler from '../components/schedule/Scheduler';
import AddTask from '../components/tasks/AddTask';

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
  const [duration, setDuration] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [hasError, setErrors] = useState(false);

  const taskChangeHandler = (event) => {
    setTask(event.target.value);
  };
  const durationChangeHandler = (event) => {
    setDuration(event.target.value);
  };
  const createNewTask = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: task,
        duration: duration,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        taskList.push(response);
        setTaskList(taskList);
        setTask('');
        setDuration(0);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('http://localhost:5000/tasks');
      response
        .json()
        .then((response) => setTaskList(response))
        .catch((error) => setErrors(error));
    }
    fetchTasks();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <AddTask
              task={task}
              duration={duration}
              createNewTask={createNewTask}
              taskChangeHandler={taskChangeHandler}
              durationChangeHandler={durationChangeHandler}
              taskList={taskList}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Scheduler />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
