// Library
import React from 'react';

// Components
import AddTask from './AddTask';
import TaskList from './TaskList';

export default function TaskContainer() {
  return (
    <div>
      <AddTask />
      <TaskList />
    </div>
  );
}
