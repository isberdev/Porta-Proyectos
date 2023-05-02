//*peticion de la url de servidor a enviar fetch
const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;

//*pedir todos los item
export const loadTodos = async () => {
  // return fetch(baseUrl).then((res) => res.json());
  const res = await fetch(baseUrl);
  return await res.json();
};

//*pedir item por id
export const getTodo = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`);
  return await res.json();
};

//*crear item nuevo
export const createTodo = (todo) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed,
    }),
  }).then((res) => res.json());
};

//*actualizar item
export const updateTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }),
  });
  return await res.json();
};

//!otra forma de contruir el await
// export const updateTodo = (todo) => {
//   return fetch(`${baseUrl}/${todo.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: todo.id,
//       title: todo.title,
//       completed: todo.completed,
//     }),
//   }).then((res) => res.json());
// };

//*eliminar item
export const deleteTodo = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
