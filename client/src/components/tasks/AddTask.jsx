// Library
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({}));

export default function AddTask() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='taskName'
          label='Task'
          placeholder='Enter task name'
          variant='outlined'
        />
        <TextField
          id='duration'
          label='Duration'
          placeholder='Enter duration'
          variant='outlined'
        />
        <Button variant='contained'>+</Button>
      </div>
    </form>
  );
}
