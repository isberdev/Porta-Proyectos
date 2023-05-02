import React from "react";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

//*creacion de formulario create item

const TodoForm = ({ onFromSunmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFromSunmit({
      title: form.getFieldValue("title"),
      completed: false,
    });
    console.log(form.getFieldsValue("title"));
    form.resetFields();
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input placeholder="¿Que necesitas que haga?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add Tarea
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
