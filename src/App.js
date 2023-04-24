import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// antd core
import { Card, Tooltip, Button, Popconfirm } from "antd";

// antd icon
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// components
import TodoCard from "./components/TodoCard";
import ModalCard from "./components/ModalCard";

// context
import { useAppContext } from "./context/AppContext";

function App() {
  const {
    trackers,
    handleDragList,
    handleDragCard,
    handleDeleteList,
    handleDeleteCard,
    handleAddCard,
    handleTakeIdAddList,
  } = useAppContext();
  const [open, setOpen] = useState(false);

  function onDragEnd(result) {
    const { destination, type } = result;
    if (!destination) return;

    // drag list
    if (type === "LIST") {
      handleDragList(result);
      return;
    }
    // drag card
    if (type === "CARD") {
      handleDragCard(result);
      return;
    }

    // drag card
    // handleDragCard(result);
  }
  function onConfirm(listId) {
    handleDeleteList(listId);
  }
  function takeIdCard(cardId, columnsId) {
    console.log("cardId App: ", cardId);
    handleDeleteCard(cardId, columnsId);
  }
  function takeValueAddCard(value) {
    handleAddCard(value);
  }
  function takeIdAddList(idAddList) {
    handleTakeIdAddList(idAddList);
  }
  function handleAddAnotherList() {
    console.log("handleAddAnotherList");
  }
  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div className="header__avatar">
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
                    {trackers.columns.map((columnsId, index) => {
                      const listItem = trackers.lists[columnsId];

                      const cards = listItem.cards.map((cardId) => {
                        return trackers.cards[cardId];
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
                                              onClick={() => (
                                                setOpen(true),
                                                takeIdAddList(listItem.id)
                                              )}
                                            />
                                          </Tooltip>

                                          <Popconfirm
                                            title="Delete the list"
                                            description="Are you sure to delete this list?"
                                            onConfirm={() =>
                                              onConfirm(listItem.id)
                                            }
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
                                            columnsId={columnsId}
                                            takeIdCard={takeIdCard}
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
              <Button type="text" onClick={handleAddAnotherList}>
                <PlusOutlined />
                Add another list
              </Button>
            </DragDropContext>
          </div>
        </div>
      </main>

      <ModalCard
        open={open}
        setOpen={setOpen}
        takeValueAddCard={takeValueAddCard}
      />
    </>
  );
}

export default App;
