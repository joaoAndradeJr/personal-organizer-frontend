export default async function addTask(inputTask, taskStatus) {
  await fetch('https://personaltaskslist-bk.herokuapp.com/', {
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
}
