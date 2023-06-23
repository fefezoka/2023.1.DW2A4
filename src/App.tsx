import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, global, toast, ToastContainer } from './styles';
import { v4 } from 'uuid';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AddTask, TaskDetails, Tasks, Header } from './components';
import { Line } from './styles/Skeleton';
import { IoRefresh } from 'react-icons/io5';

export const App = () => {
  global();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tasks = window.localStorage.getItem('tasks');

    if (tasks) {
      setTasks(JSON.parse(tasks) as Task[]);
      setLoading(false);
      return;
    }

    axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10').then((response) => {
      setTasks(response.data);
      setLoading(false);
      window.localStorage.setItem('tasks', JSON.stringify(response.data));
    });
  }, []);

  const handleTaskClick = (taskId: string) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleTaskAddition = (title: string) => {
    const newTasks = [...tasks, { id: v4(), title, completed: false, userId: 2 }];

    setTasks(newTasks);
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleTaskDeletion = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));
    toast.success('Tarefa deletada com sucesso!');
  };

  const clearLocalStorage = () => {
    window.localStorage.removeItem('tasks');
    window.location.reload();
  };

  return (
    <Router>
      <ToastContainer />
      <Box
        css={{
          maxWidth: 500,
          m: 'auto',
          mt: '$4',
          p: '$6',
          border: '2px solid $blue9',
          br: '$4',
          position: 'relative',
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Box
                  css={{ position: 'absolute', top: 32, right: 32, cursor: 'pointer' }}
                  onClick={clearLocalStorage}
                >
                  <IoRefresh size={24} color="var(--colors-blue9)" />
                </Box>
                {loading ? (
                  <Line rows={10} css={{ height: 48 }} />
                ) : (
                  <Tasks
                    tasks={tasks}
                    handleTaskClick={handleTaskClick}
                    handleTaskDeletion={handleTaskDeletion}
                  />
                )}
              </>
            }
          />
          <Route path="/:taskTitle" element={<TaskDetails />} />
        </Routes>
      </Box>
    </Router>
  );
};
