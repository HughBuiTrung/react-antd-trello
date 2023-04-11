import React from 'react'
import { useState } from 'react';
import { Avatar, Modal, Input, Form, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

function ModalCard({ open, setOpen }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = (values) => {
    console.log('values: ', values)
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  return (
    <Modal
      title="Add Card"
      open={open}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <br />
      <Form
        name="basic"
        form={form}
        initialValues={{ status: 'new' }}
        onFinish={handleSubmit}
        autoComplete="off"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Member"
          name="member"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            optionLabelProp="label"
            onChange={handleChange}
          >
            <Option value="tony123" label="tony 123">
              <div className="selectField">
                <Avatar src="https://picsum.photos/id/237/200/300" />
                <span>Tony Nguyen</span>
              </div>
            </Option>
            <Option value="phuong123" label="phuong 123">
              <div className="selectField">
                <Avatar src="https://picsum.photos/id/237/200/300" />
                <span>Phuong Nguyen</span>
              </div>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: 'new',
                label: 'New',
              },
              {
                value: 'inprocess',
                label: 'In process',
              },
              {
                value: 'done',
                label: 'Done',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCard