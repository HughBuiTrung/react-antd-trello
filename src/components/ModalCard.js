import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, Tooltip, Modal, Input, Form, Select } from "antd";

// context
import { useAppContext } from "../context/AppContext";

const { TextArea } = Input;
const { Option } = Select;

export default function ModalCard() {
  const { handleAddCard, modal, setModal, handleEditCard } = useAppContext();
  var modalTitle = "";
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = (values) => {
    handleAddCard({
      listId: modal.listId,
      values,
    });
    setConfirmLoading(true);
    form.resetFields();
    setModal(null);
    handleEditCard(values);
  };

  const handleCancel = () => {
    setModal(null);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  React.useLayoutEffect(() => {
    form.resetFields();
  });

  if (!modal) return <></>;

  if (modal.type === "ADD_CARD") {
    modalTitle = "Add Card";
  }
  if (modal.type === "EDIT_CARD") {
    modalTitle = "Edit Card";
  }
  console.log("---------", modal?.card?.member?.length);
  console.log(modal?.card?.member);
  return (
    <Modal
      title={modalTitle}
      open={Boolean(modal)}
      onOk={form.submit}
      onCancel={handleCancel}
      // confirmLoading={confirmLoading}
    >
      <br />
      <Form
        name="basic"
        form={form}
        initialValues={{
          title: modal?.card?.title,
          description: modal?.card?.description,
          member:
            modal?.card?.member?.length > 0
              ? modal?.card?.member.map((item) => item)
              : [],
          status: "new",
        }}
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
