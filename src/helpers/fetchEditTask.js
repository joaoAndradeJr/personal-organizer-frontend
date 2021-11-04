export default async function task (id) {
  const taskResponse = await fetch(`https://personaltaskslist-bk.herokuapp.com/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return taskResponse;
};
