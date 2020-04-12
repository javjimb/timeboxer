// Library
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({}));

export default function AddTask() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <TextField
            id='taskName'
            label='Task'
            placeholder='Enter task name'
            variant='outlined'
            size='small'
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='duration'
            label='Duration'
            placeholder='Enter duration'
            variant='outlined'
            size='small'
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' fullWidth>
            +
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
