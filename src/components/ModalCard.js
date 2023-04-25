import React from "react";
import { useState } from "react";
import { Avatar, Tooltip, Modal, Input, Form, Select } from "antd";

// context
import { useAppContext } from "../context/AppContext";

const { TextArea } = Input;
const { Option } = Select;

export default function ModalCard({ modal, setModal }) {
  
  const {
    handleAddCard,
  } = useAppContext();

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = (values) => {
    handleAddCard({
      listId: modal.listId,
      values
    });
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setModal(null);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  function handleViewDetail() {
    Modal.info({
      title: "Card Detail",
      content: (
        <>
          <div>
            <h4>Title</h4>
            <div>This is title</div>
          </div>
          <br />
          <div>
            <h4>Description</h4>
            <div>This is description</div>
          </div>
          <br />
          <div>
            <h4>Member</h4>
            <div>
              <Avatar.Group>
                <Tooltip title="Tony Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
                <Tooltip title="Phuong Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
              </Avatar.Group>
            </div>
          </div>
          <br />
          <div>
            <h4>Status</h4>
            <div>New</div>
          </div>
        </>
      ),
      onOk() {},
    });
  }

  if(!modal) return <></>

  return (
    <Modal
      title="Add Card"
      open={Boolean(modal)}
      onOk={form.submit}
      onCancel={handleCancel}
      // confirmLoading={confirmLoading}
    >
      <br />
      <Form
        name="basic"
        form={form}
        initialValues={{ status: "new" }}
        onFinish={handleSubmit}
        autoComplete="off"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Member"
          name="member"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
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

        <Form.Item label="Status" name="status">
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "new",
                label: "New",
              },
              {
                value: "inprocess",
                label: "In process",
              },
              {
                value: "done",
                label: "Done",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
