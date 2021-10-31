import React, { useState, useEffect } from 'react';

function Home() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);
    fetch('http://localhost:3001/')
      .then(resp => resp.json())
      .then(data => {
        setTasks(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTasks();
  }, [], [inputTask]);

  const addTask = async () => {
    await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: inputTask,
      }),
    });
    getTasks();
  };

  const removeTask = async (id) => {
    await fetch(`http://localhost:3001/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    getTasks();
  };

  const editTask = (id) => {
    console.log('edita tarefa ', id)
  };

  return (
    <div>
      { isLoading ? <h3>Loading...</h3>
      : 
        <>
          <section>
            <label htmlFor="task-input">
              <input
                type="text"
                id="task-input"
                placeholder="Type your task here"
                onChange={(e) => setInputTask(e.target.value)}
              />
            </label>
            <button
              type="button"
              id="add-task-button"
              onClick={addTask}
            >
              Add task
            </button>        
          </section>
          <section>
            <ul>
              { tasks.map((e) => (
                <div key={e._id}>
                  <li>{e.task}</li>
                  <button
                    type="button"
                    id="edit-button"
                    onClick={() => editTask(e._id)}
                  >
                    Edit task
                  </button>
                  <button
                  type="button"
                  id="remove-button"
                  onClick={() => removeTask(e._id)}
                  >
                    remove task
                  </button>
                </div>
              ))}
            </ul>
          </section>
        </>
      }
    </div>
  ); 
}

export default Home;
