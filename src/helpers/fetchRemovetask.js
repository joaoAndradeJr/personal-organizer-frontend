export default async function removeTask(id) {
  await fetch(`https://personaltaskslist-bk.herokuapp.com/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
