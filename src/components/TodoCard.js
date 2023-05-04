import React, { useState } from "react";
import { Card, Avatar, Tooltip, Popconfirm, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AntDesignOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Draggable } from "react-beautiful-dnd";
import { useAppContext } from "../context/AppContext";
export default function TodoList({
  index,
  card,
  setModal,
  columnsId,
  takeIdCard,
  listId,
  modal,
}) {
  function onConfirm(cardId) {
    console.log("cardId: ", cardId);
    console.log("columnsId: ", columnsId);
    takeIdCard(cardId, columnsId);
  }

  function handleView() {
    const { member } = card;

    Modal.info({
      title: "Card Detail",
      content: (
        <>
          <div>
            <h4>Title</h4>
            <div>{card.title}</div>
          </div>
          <br />
          <div>
            <h4>Description</h4>
            <div>{card.description}</div>
          </div>
          <br />
          <div>
            <h4>Member</h4>
            <div>
              {member[0].name}

              {/* <Avatar.Group>
                <Tooltip title="Tony Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
                <Tooltip title="Phuong Nguyen" placement="top">
                  <Avatar src="https://picsum.photos/265/160" />
                </Tooltip>
              </Avatar.Group> */}
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

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              className="cardItem"
              cover={<img alt="example" src="https://picsum.photos/265/160" />}
              actions={[
                <Tooltip title="View">
                  <FileTextOutlined key="view" onClick={handleView} />
                </Tooltip>,
                <Tooltip title="Edit">
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setModal({ type: "EDIT_CARD", listId, card });
                    }}
                  />
                </Tooltip>,
                <Popconfirm
                  title="Delete the card"
                  description="Are you sure to delete this card?"
                  onConfirm={() => onConfirm(card.id)}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                  className="ml-10"
                >
                  <Tooltip title="Delete">
                    <DeleteOutlined key="ellipsis" />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              <Meta
                title={card.title}
                description={
                  <>
                    <div>{card.description}</div>
                    <Avatar.Group
                      maxCount={2}
                      maxPopoverTrigger="click"
                      size="large"
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        cursor: "pointer",
                      }}
                      className="avatarGroup"
                    >
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          style={{ backgroundColor: "#87d068" }}
                          icon={<UserOutlined />}
                        />
                      </Tooltip>
                      <Avatar
                        style={{ backgroundColor: "#1890ff" }}
                        icon={<AntDesignOutlined />}
                      />
                    </Avatar.Group>
                  </>
                }
              />
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
}
