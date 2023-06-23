import React from 'react';
import { Task } from './Task';

interface ITasks {
  tasks: Task[];
  handleTaskClick: (id: string) => void;
  handleTaskDeletion: (id: string) => void;
}

export const Tasks = ({ tasks, handleTaskClick, handleTaskDeletion }: ITasks) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          handleTaskClick={handleTaskClick}
          handleTaskDeletion={handleTaskDeletion}
        />
      ))}
    </>
  );
};
