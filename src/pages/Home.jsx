import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import './Home.css';
import fetchEditTask from '../helpers/fetchEditTask';

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
    
    const task = await fetchEditTask(id);

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
          <Header />
          <section>
            <Form className="task-form">
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
                    <option value={PENDING}>{PENDING}</option>
                    <option value={IN_PROGRESS}>{IN_PROGRESS}</option>
                    <option value={DONE}>{DONE}</option>
                  </Form.Control>
                </Form.Label>
                { isEditing ?
                  <Button
                    variant="outline-success"
                    id="edit-task-button"
                    onClick={saveTask}
                  >
                    Save task
                  </Button>  
                :
                  <Button
                    variant="success"
                    id="add-task-button"
                    onClick={addTask}
                  >
                    Add task
                  </Button>
              }
              </Form.Group>
            </Form>
          </section>
          <section className="task-list">
            { tasks.length > 0 ? 
              <ListGroup as="ol">
                { tasks.map((e, index) => (
                  <div key={e._id}>
                    <ListGroup.Item
                      as="li"
                      variant={index % 2 === 0 ? "primary" : "secondary"}
                    >
                      <p id="task-id"><i>id: {e._id}</i></p>
                      <h4>{e.task}</h4>
                      <p><i>{e.status}</i></p>
                      <Button
                        variant="success"
                        id="edit-button"
                        onClick={() => editTask(e._id)}
                      >
                        Edit task
                      </Button>
                      {'  '}
                      <Button
                        variant="success"
                        id="remove-button"
                        onClick={() => removeTask(e._id)}
                      >
                        remove task
                      </Button>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
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
