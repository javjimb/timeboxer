// Library
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Components
import TaskList from './TaskList';

const useStyles = makeStyles((theme) => ({}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '100%', height: '2rem' },
  borderColor: 'text.primary',
};

export default function AddTask() {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState(0);
  const [taskList, setTaskList] = useState([]);

  const taskChangeHandler = (event) => {
    setTask(event.target.value);
  };
  const durationChangeHandler = (event) => {
    setDuration(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: task,
        duration: duration,
      }),
    })
      .then((response) => {
        console.log(response);
        taskList.push(response);
        setTaskList(taskList);
        setTask('');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={submitHandler}>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <TextField
              id='taskName'
              label='Create a new task'
              placeholder='Enter task name'
              variant='outlined'
              size='small'
              fullWidth
              value={task}
              onChange={taskChangeHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='duration'
              label='Duration'
              placeholder='hours'
              variant='outlined'
              size='small'
              fullWidth
              value={duration}
              onChange={durationChangeHandler}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant='contained' fullWidth type='submit'>
              +
            </Button>
          </Grid>
        </Grid>
        <Box borderBottom={1} {...defaultProps} />
      </form>
      <TaskList />
    </div>
  );
}
