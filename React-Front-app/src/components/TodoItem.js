import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const Todo = ({ todo, onTodoRemoval, onTodoToggle }) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={
            todo.completed ? "Marcar como incompleta" : "Marcar como completa"
          }
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title={"¿Estás seguro de que quieres eliminar?"}
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            x
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? "cyan" : "red"} className="todo-tag">
          {todo.title}
        </Tag>
      </div>
    </List.Item>
  );
};

export default Todo;
