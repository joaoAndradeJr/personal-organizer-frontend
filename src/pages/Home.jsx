import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Home() {
  const bdUrl = 'https://personaltaskslist-bk.herokuapp.com';
  const PENDING = 'Pendente';
  const IN_PROGRESS = 'Em Progresso';
  const DONE = 'Pronto';
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(PENDING);
  const [isEditing, setIsEditing] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);
    fetch(bdUrl)
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
    await fetch(bdUrl, {
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
    await fetch(`https://personaltaskslist-bk.herokuapp.com/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    getTasks();
  };

  const saveTask = async () => {
    const task = document.querySelector('#task-input').value;
    const status = document.querySelector('#task-status').value;
    const id = document.querySelector('#task-id').innerText.substr(4, 24);
    setIsLoading(true);
    await fetch(`https://personaltaskslist-bk.herokuapp.com/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task, status,
      }),
    });
    
    setIsEditing(true);
    setIsLoading(false);
    getTasks();
  };

  const editTask = async (id) => {
    setIsLoading(true);
    setIsEditing(true);
    const task = await fetch(`https://personaltaskslist-bk.herokuapp.com/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    task.json().then((data) => {
      document.querySelector('#task-input').value = data.task;
      document.querySelector('#task-status').value = data.status;
    });
    

    setIsLoading(false);
  };

  return (
    <div>
      { isLoading ? <h3>Loading...</h3>
      : 
        <>
          <section>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  Digite a tarefa:
                  <Form.Control
                    id="task-input"
                    type="text"
                    placeholder="Escreva sua tarefa aqui..."
                    onChange={(e) => setInputTask(e.target.value)}
                  />
                </Form.Label>
                <Form.Label>
                  Selecione o status da tarefa:
                  <Form.Control
                    as="select"
                    id="task-status"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                  >
                    <option value={PENDING}>Pendente</option>
                    <option value={IN_PROGRESS}>Em Andamento</option>
                    <option value={DONE}>Pronto</option>
                  </Form.Control>
                </Form.Label>
                { isEditing ?
                  <Button
                    variant="outline-primary"
                    id="edit-task-button"
                    onClick={saveTask}
                  >
                    Save task
                  </Button>  
                :
                  <Button
                    variant="outline-success"
                    id="add-task-button"
                    onClick={addTask}
                  >
                    Add task
                  </Button>
              }
              </Form.Group>
            </Form>
          </section>
          <section>
            { tasks.length > 0 ? 
              <ul>
                { tasks.map((e) => (
                  <div key={e._id}>
                    <li>
                      <p id="task-id">id: {e._id}</p>
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
