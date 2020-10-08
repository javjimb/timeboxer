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

export default function ScheduledTaskList({ taskList, updateTaskStatus }) {
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
          .sort((a,b) => a.start - b.start)
          .map((task) => (
            <ListItem
              name={task.name}
              duration={task.duration}
              id={task._id}
              key={task._id}>
              {
                <ListItemText
                  primary={moment.unix(task.start).format('HH:mm') + ' - ' + moment.unix(task.end).format('HH:mm') + ' ' + task.name}
                  style={{
                    textDecoration:
                      task.status === 'completed' ? 'line-through' : 'none',
                  }}
                />
              }
              <ListItemSecondaryAction>
                <Tooltip title='Mark as completed'>
                <IconButton
                  edge='end'
                  aria-label='completed'
                  onClick={() => updateTaskStatus(task._id, 'scheduled', 'completed')}>
                  <CheckCircleOutlinedIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title='Remove from schedule'>
                <IconButton
                  edge='end'
                  aria-label='scheduled'
                  onClick={() => updateTaskStatus(task._id, 'scheduled', 'new') }>
                  <HighlightOffIcon />
                </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        <Divider />
      </List>
    </div>
  );
}
