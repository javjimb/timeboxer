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

export default function ScheduledTaskList({ taskList }) {
  //   only show if there are scheduled tasks
  let scheduledTime = _.some(taskList, { status: 'scheduled' }) ? (
    <scheduledTime taskList={taskList} />
  ) : (
    ''
  );

  return (
    <div>
      <List>
        {scheduledTime}
        {taskList
          .filter((item) => item.status == 'scheduled')
          .map((task) => (
            <ListItem
              name={task.name}
              duration={task.duration}
              id={task._id}
              key={task._id}>
              <ListItemText primary={task.name + ' ' + task.duration + 'hrs'} />
              <ListItemSecondaryAction>
                <Tooltip title='Mark as completed'>
                  <IconButton
                    edge='end'
                    aria-label='completed'
                    //   onClick={() => deleteTask(task._id)}
                  >
                    <CheckCircleOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Removed from scheduled'>
                  <IconButton edge='end'>
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
