import React, { useState, useEffect } from 'react';

function Home() {
  const PENDING = 'Pendente';
  const IN_PROGRESS = 'Em Progresso';
  const DONE = 'Pronto';
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(PENDING)

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
  }, [], [inputTask, taskStatus]);

  const addTask = async () => {
    setIsLoading(true);
    await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: inputTask,
        status: taskStatus,
      }),
    });
    setIsLoading(false);
    getTasks();
  };

  const removeTask = async (id) => {
    setIsLoading(true);
    await fetch(`http://localhost:3001/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
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
                placeholder="Escreva sua tarefa aqui..."
                onChange={(e) => setInputTask(e.target.value)}
              />
            </label>
            <select id="task-status" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value={PENDING}>Pendente</option>
              <option value={IN_PROGRESS}>Em Andamento</option>
              <option value={DONE}>Pronto</option>
            </select>
            <button
              type="button"
              id="add-task-button"
              onClick={addTask}
            >
              Add task
            </button>        
          </section>
          <section>
            { tasks.length > 0 ? 
              <ul>
                { tasks.map((e) => (
                  <div key={e._id}>
                    <li>
                      {e.task}
                      <p><i>{e.status}</i></p>
                    </li>
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
            :
              <h2>Nenhuma tarefa adicionada</h2> 
            }
          </section>
        </>
      }
    </div>
  ); 
}

export default Home;
