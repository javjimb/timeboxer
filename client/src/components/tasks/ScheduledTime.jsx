import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ScheduledTime({ taskList }) {
  let totalTime = 0;
  taskList.forEach((task) => {
    if (task.status === 'scheduled') {
      totalTime += task.duration;
    }
  });

  return (
    <div>
      <Typography variant='h6'>
        Total scheduled time: {totalTime} hrs
      </Typography>
    </div>
  );
}
