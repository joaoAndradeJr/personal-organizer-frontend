import React, { useState, useEffect } from 'react';

function Home() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

  }, [inputTask, tasks]);

  const addTask = () => {
    setTasks([...tasks, inputTask]);
    setInputTask('');
    console.log(inputTask)
  }

  const removeTask = (id) => {
    console.log('remove tafera ', id)
  };

  const editTask = (id) => {
    console.log('edita tarefa ', id)
  };

  return (
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
        <ul id="tasks">
          { tasks.map((task, index) => (
            <div key={index}>
              <li>{task}</li>
              <button
                type="button"
                id="edit-button"
                onClick={() => editTask(index)}
              >
                Edit task
              </button>
              <button
              type="button"
              id="remove-button"
              onClick={() => removeTask(index)}
              >
                remove task
              </button>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
