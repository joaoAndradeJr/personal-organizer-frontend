import React, { useState, useEffect } from 'react';

function Home() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/')
      .then(resp => resp.json())
      .then(data => {
        setTasks(data);
        setIsLoading(false);
      });
  }, [inputTask]);

  const addTask = () => {
    // setTasks([...tasks, inputTask]);
    // setInputTask('');
    // console.log(inputTask)
  }

  const removeTask = (id) => {
    console.log('remove tafera ', id)
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
              { tasks.map((e, index) => (
                <div key={index}>
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
