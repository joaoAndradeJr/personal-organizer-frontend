export default async function saveEditedTask(id, task, status) {
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
}
