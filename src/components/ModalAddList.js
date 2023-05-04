import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ModalAppList = ({ handleAddAnotherList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddAnotherList(value);
    setIsModalOpen(false);
    setValue("");
  };
  function handleOnChange(event) {
    setValue(event.target.value);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Add another list
      </Button>
      <Modal
        title="Add New List Todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Name" value={value} onChange={handleOnChange} />
      </Modal>
    </>
  );
};

export default ModalAppList;
