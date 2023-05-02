import React, { useEffect, useCallback, useState } from "react";
import { Tabs, Layout, Row, Col, message } from "antd";
import "./TodoList.css";
import TodoTab from "./TodoTab";
import TodoForm from "./TodoForm";

import {
  createTodo,
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../services/todoServices";

//*constantes de gestion de stylos ant design
const Content = Layout;
const onChange = (key) => {
  console.log(key);
};

const TodoList = () => {
  //*hooks
  const [Refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  //*funcion para llamadas asincronas
  const handleFormSubmint = (todo) => {
    console.log("Crear tarea", todo);
    createTodo(todo).then(onRefresh());
    message.success("Tarea creada con exito");
  };

  const handleRemoveTodo = (todo) => {
    deleteTodo(todo.id).then(onRefresh());
    message.warn("Tarea eliminada con exito");
  };
  const handleTaggleTodosStatus = (todo) => {
    todo.completed = !todo.completed;
    updateTodo(todo).then(onRefresh());
    message.info("Tarea actualizada");
  };

  //*refresh hooks
  const Refresh = () => {
    loadTodos()
      .then((res) => {
        setTodos(res);
        setActiveTodos(res.filter((todo) => todo.completed === false));
        setCompletedTodos(res.filter((todo) => todo.completed === true));
      })
      .then(console.log("fetch completado"));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let data = await loadTodos();
    setTodos(data);
    setActiveTodos(data.filter((todo) => todo.completed === false));
    setCompletedTodos(data.filter((todo) => todo.completed === true));
    setRefreshing(false);
    console.log("Refresh state", Refreshing);
  }, [Refreshing]);

  useEffect(() => {
    Refresh();
  }, [onRefresh]);

  //*creacion de las items de tabs
  const items = [
    {
      key: "all",
      label: "Tareas",
      children: (
        <TodoTab
          todos={todos}
          onTodoToggle={handleTaggleTodosStatus}
          onTodoRemoval={handleRemoveTodo}
        />
      ),
    },
    {
      key: "active",
      label: "active",
      children: (
        <TodoTab
          todos={activeTodos}
          onTodoToggle={handleTaggleTodosStatus}
          onTodoRemoval={handleRemoveTodo}
        />
      ),
    },
    {
      key: "completed",
      label: "Completed",
      children: (
        <TodoTab
          todos={completedTodos}
          onTodoToggle={handleTaggleTodosStatus}
          onTodoRemoval={handleRemoveTodo}
        />
      ),
    },
  ];
  //*jsx
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className="todolist">
          <Row>
            <Col span={14} offset={5}>
              <h3>
                Proyecto MERN Todolist /
                React(ant-Design)//Nest(swagger)//MongoDB
              </h3>
              <h1 className="todotitule">Todo List</h1>
              <TodoForm onFromSunmit={handleFormSubmint} />
              <br />
              <Tabs
                defaultActiveKey="all"
                items={items}
                onChange={onChange}
              ></Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default TodoList;
