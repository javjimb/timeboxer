// Library
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UnscheduledTime from './UnscheduledTime';

const _ = require('lodash');

export default function TaskList({ taskList, deleteTask }) {
  // only show if there are new unscheduled tasks
  let unscheduledTime = _.some(taskList, { status: 'new' }) ? (
    <UnscheduledTime taskList={taskList} />
  ) : (
    ''
  );

  return (
    <div>
      <List>
        {unscheduledTime}
        {taskList
          .filter((item) => item.status === 'new')
          .map((task) => (
            <ListItem
              className='draggable-task'
              name={task.name}
              duration={task.duration}
              id={task._id}
              key={task._id}>
              <ListItemText primary={task.name + ' ' + task.duration + 'hrs'} />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => deleteTask(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        <Divider />
      </List>
    </div>
  );
}
