import React from 'react';
// import styles from './Sites.css';

import { Form, Input, Button, DatePicker } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values: any) => {
  console.log(values);
};

export default function NewSite(): JSX.Element {
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['site', 'name']}
          label="Nombre"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["site", "startdate"]}
          label="DatePicker"
          rules={[
            { type: 'object', required: true, message: 'Please select time!' },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item name={['site', 'information']} label="Más Información">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Crear Obra
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
