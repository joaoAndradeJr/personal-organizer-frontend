import React, { useState, useEffect } from 'react';

function Home() {
  const [inputTaskValue, setInputTaskValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

  }, [inputTaskValue, tasks]);

  const handleClick = (target) => {
    const { id } = target;
    console.log(id)
    setTasks([...tasks, inputTaskValue]);
  }

  return (
    <>
      <section>
        <label htmlFor="task-input">
          <input
            type="text"
            id="task-input"
            placeholder="Type your task here"
            onChange={(e) => setInputTaskValue(e.target.value)}
          />
        </label>
        <button
          type="button"
          id="add-task-button"
          onClick={(e) => handleClick(e.target)}
        >
          Add task
        </button>
        <button
          type="button"
          id="edit-task-button"
        >
          Edit task
        </button>
        <button
          type="button"
          id="remove-task-button"
        >
          remove task
        </button>
      </section>
      <section>
        <ul id="tasks">
          { tasks.map((task, index) => <li key={index}>{task}</li>) }
        </ul>
      </section>
    </>
  );
}

export default Home;
