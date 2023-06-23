import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, global, toast, ToastContainer } from './styles';
import { v4 } from 'uuid';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AddTask, TaskDetails, Tasks, Header } from './components';
import { Line } from './styles/Skeleton';

export const App = () => {
  global();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10').then((response) => {
      setTasks(response.data);
      setLoading(false);
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
    setTasks((tasks) => [...tasks, { id: v4(), title, completed: false, userId: 2 }]);
  };

  const handleTaskDeletion = (taskId: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    toast.success('Tarefa deletada com sucesso!');
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
