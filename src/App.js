import React, { useState } from "react";
import { Card, Tooltip, Button, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./components/TodoCard";
import ModalCard from "./components/ModalCard";
import { data } from "./components/data";
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [open, setOpen] = useState(false);

  function onDragEnd() {
    console.log("onDragEnd");
  }

  return (
    <>
      <header>
        <div class="header__container">
          <div class="header__logo" />
          <div class="header__right">
            <div class="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="content">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="all-list"
                type="LIST"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="listContainer"
                  >
                    {data.columns.map((columnsId, index) => {
                      const listItem = data.lists[columnsId];
                      const cards = listItem.cards.map((cardId) => {
                        return data.cards[cardId];
                      });
                      return (
                        <React.Fragment key={listItem.id}>
                          <Draggable
                            draggableId={String(listItem.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Droppable
                                  droppableId={String(listItem.id)}
                                  type="CARD"
                                  direction="vertical"
                                >
                                  {(provided) => (
                                    <Card
                                      title={listItem.title}
                                      className="cardList"
                                      extra={
                                        <>
                                          <Tooltip title="Add a card">
                                            <Button
                                              shape="circle"
                                              icon={<PlusOutlined />}
                                              onClick={() => setOpen(true)}
                                            />
                                          </Tooltip>

                                          <Popconfirm
                                            title="Delete the list"
                                            description="Are you sure to delete this list?"
                                            onConfirm={() => {}}
                                            onCancel={() => {}}
                                            okText="Yes"
                                            cancelText="No"
                                            className="ml-10"
                                          >
                                            <Tooltip title="Delete this list">
                                              <Button
                                                shape="circle"
                                                icon={<DeleteOutlined />}
                                              />
                                            </Tooltip>
                                          </Popconfirm>
                                        </>
                                      }
                                    >
                                      <div
                                        ref={provided.innerRef}
                                        style={{}}
                                        {...provided.droppableProps}
                                      >
                                        {cards.map((cards, cardIndex) => (
                                          <TodoCard
                                            index={cardIndex}
                                            card={cards}
                                            key={cards.id}
                                            setOpen={setOpen}
                                          />
                                        ))}

                                        {provided.placeholder}
                                      </div>
                                    </Card>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        </React.Fragment>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button type="text">
                <PlusOutlined /> Add another list
              </Button>
            </DragDropContext>
          </div>
        </div>
      </main>

      {/* <Modal
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
      </Modal> */}
      <ModalCard open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
