// Library
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

// Components
import ScheduledTime from './ScheduledTime';

const _ = require('lodash');
const moment = require('moment');

export default function ScheduledTaskList({ taskList, updateTask }) {
  //   only show if there are scheduled tasks
  let scheduledTime = _.some(taskList, {
    status: 'scheduled',
  }) ? (
    <ScheduledTime taskList={taskList} />
  ) : (
    ''
  );

  return (
    <div>
      <List>
        {scheduledTime}
        {taskList
          .filter((item) => item.status !== 'new')
          .map((task) => (
            <ListItem
              name={task.name}
              duration={task.duration}
              id={task._id}
              key={task._id}>
              {task.status === 'completed' ? (
                <ListItemText
                  primary={
                    moment.unix(task.start).format('HH:mm') +
                    ' - ' +
                    moment.unix(task.end).format('HH:mm') +
                    ' ' +
                    task.name
                  }
                  style={{ textDecoration: 'line-through' }}
                />
              ) : (
                <ListItemText
                  primary={
                    moment.unix(task.start).format('HH:mm') +
                    ' - ' +
                    moment.unix(task.end).format('HH:mm') +
                    ' ' +
                    task.name
                  }
                />
              )}
              <ListItemSecondaryAction>
                {/* <Tooltip title='Mark as completed'> */}
                <IconButton
                  edge='end'
                  aria-label='completed'
                  onClick={() => updateTask(task._id, { status: 'completed' })}>
                  <CheckCircleOutlinedIcon />
                </IconButton>
                {/* </Tooltip>
                <Tooltip title='Removed from scheduled'> */}
                <IconButton
                  edge='end'
                  aria-label='scheduled'
                  onClick={() =>
                    updateTask(task._id, { status: 'new', start: 0, end: 0 })
                  }>
                  <HighlightOffIcon />
                </IconButton>
                {/* </Tooltip> */}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        <Divider />
      </List>
    </div>
  );
}
