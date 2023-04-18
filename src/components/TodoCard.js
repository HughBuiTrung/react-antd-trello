import React, { useContext, useState } from "react";
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
import { AppContext } from "../context/DataContext";
export default function TodoList({ index, card, setOpen, columnsId }) {
  const data = useContext(AppContext);
  const [cards, setCards] = useState(data.lists[columnsId].cards);
  console.log("data: ", data);
  console.log("card: ", card);
  function handleViewDetail() {
    // const [open, setOpen] = useState(false);
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
  function onConfirm(cardId) {
    console.log("cardDeleteId", cardId);
    console.log("columnsId: ", columnsId);
    console.log("======= ", data.lists[columnsId]);
    const cloneCards = [...cards];
    const indexCard = cloneCards.findIndex((index) => index === cardId);
    cloneCards.splice(indexCard, 1);
    setCards(cloneCards);
    // data.lists[columnsId].cards = cloneCards;
    console.log("indexCard: ", indexCard);
    console.log("cards: ", cloneCards);
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
                  <FileTextOutlined key="view" onClick={handleViewDetail} />
                </Tooltip>,
                <Tooltip title="Edit">
                  <EditOutlined key="edit" onClick={() => setOpen(true)} />
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
                title="Learn javascript"
                description={
                  <>
                    <div>This is description</div>
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
