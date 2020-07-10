import React from 'react';
import locale from 'antd/es/date-picker/locale/es_ES';
import { useDispatch } from 'react-redux';
import { createNewSite, selectSites } from './siteSlice';
import { ISite } from '../../interfaces/interfaces';
import moment from 'moment';

import { Form, Input, Button, DatePicker, message } from 'antd';

type TSitePayload = {
  site: ISite;
};

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

export default function NewSite(): JSX.Element {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // reset from after submitting
  const onReset = () => {
    form.resetFields();
  };

  // cb() after from submittion
  const onFinish = (formData: any) => {
    // get sfecific data
    const { site }: TSitePayload = formData;

    // generate an id
    const id: number = +new Date();

    // serialize startdate
    const startdate = moment(site.startdate).format('DD/MM/YYYY');

    // dispatch new user data
    dispatch(createNewSite({ id, ...site, startdate }));

    // message + reset form
    message.success('Obra creada correctamente');
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
          name={['site', 'name']}
          label="Nombre"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['site', 'startdate']}
          label="DatePicker"
          rules={[
            { type: 'object', required: true, message: 'Please select time!' },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" locale={locale} />
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
