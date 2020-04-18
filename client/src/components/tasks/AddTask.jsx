// Library
import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Fullcalendar
import { Draggable } from '@fullcalendar/interaction';

// Components
import TaskList from './TaskList';

const useStyles = makeStyles((theme) => ({}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '100%', height: '2rem' },
  borderColor: 'text.primary',
};

export default function AddTask({
  task,
  duration,
  createNewTask,
  taskChangeHandler,
  durationChangeHandler,
  taskList,
  deleteTask,
}) {
  const classes = useStyles();

  useEffect(() => {

    // Set the draggable section of the app. This is the container where the task list is.
    let draggableEl = document.getElementById("task-list");
    new Draggable(draggableEl, {
      itemSelector: ".draggable-task",
      eventData: function(eventEl) {
        let name = eventEl.getAttribute("name");
        let id = eventEl.getAttribute("id");
        let duration = eventEl.getAttribute("duration");

        return {
          title: name,
          duration: duration,
          id: id,
          editable: true
        };
      }
    });

  }, []);

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={createNewTask}>
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
      <TaskList  taskList={taskList} deleteTask={deleteTask} />
    </div>
  );
}
