import React from 'react';
// import styles from './Workers.css';

import { Form, Input, Button, DatePicker, Select } from 'antd';

const { Option } = Select;

const tipoTrabajadores = [
  'Oficial 1',
  'Oficial 2',
  'Oficial3 ',
  'Peón',
  'Ayudante',
  'Encargado',
  'Jefe de Obra',
  'Presidente',
];

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

export default function NewWorker(): JSX.Element {
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['worker', 'name']}
          label="Nombre"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['worker', 'workertype']}
          label="Tipo de Trabajador"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Tipo de Trabajador"
            allowClear
          >
            {tipoTrabajadores.map((tipo, index) => (
              <Option key={index} value={tipo}>{tipo}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={['worker', 'startdate']}
          label="Fecha Incorporación"
          rules={[
            { type: 'object', required: true, message: 'Please select time!' },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name={['worker', 'information']}
          label="Información del trabajador"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Añadir Trabajador
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
