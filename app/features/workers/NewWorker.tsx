import React from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import moment from 'moment';
// import styles from './Workers.css';
import { useDispatch } from 'react-redux';
import { createNewWorker, selectWorkers } from './workerSlice';

import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { IWorker } from '../../interfaces/interfaces';

type TWorkerPayload = {
  worker: IWorker;
};

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

export default function NewWorker(): JSX.Element {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // reset from after submitting
  const onReset = () => {
    form.resetFields();
  };

  // cb() after from submittion
  const onFinish = (formData: any) => {
    // get sfecific data
    const { worker }: TWorkerPayload = formData;

    // serialize startdate
    const startdate = moment(worker.startdate).format('DD/MM/YYYY');

    // generate an id
    const id: number = +new Date();

    // dispatch new user data
    dispatch(createNewWorker({ id, ...worker, startdate }));

    // message + reset form
    message.success('Trabajador añadido correctamente');
    onReset();
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
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
          <Select placeholder="Tipo de Trabajador" allowClear>
            {tipoTrabajadores.map((tipo, index) => (
              <Option key={index} value={tipo}>
                {tipo}
              </Option>
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
          <DatePicker format="DD/MM/YYYY" locale={locale} />
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
