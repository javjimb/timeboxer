// Library
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TaskList({ newTask, newDuration }) {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary={newTask} secondary={newDuration} />
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary='Task1' />
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary='Task1' />
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
