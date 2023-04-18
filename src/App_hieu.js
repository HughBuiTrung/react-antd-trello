import React, { createContext, useContext, useEffect, useState } from "react";
import { Card, Tooltip, Button, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./components/TodoCard";
import ModalCard from "./components/ModalCard";
import { AppContext } from "./context/AppContext";
// import { data } from "./components/data";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const data = useContext(AppContext);
  const [dataCards, setDataCards] = useState(data);
  const [listCards_1, setListCards_1] = useState(data.lists["list-1"].cards);
  const [listCards_2, setListCards_2] = useState(data.lists["list-2"].cards);
  const [columns, setColumns] = useState(data.columns);
  const [open, setOpen] = useState(false);
  console.log("daas", columns);

  data.lists["list-1"].cards = listCards_1;
  data.lists["list-2"].cards = listCards_2;

  data.columns = columns;
  console.log("dataCards: ", dataCards);

  function onDragEnd(result) {
    console.log("result: ", result);

    const destinationId = result.destination.droppableId;
    const destinationIndex = result.destination.index;

    const sourceId = result.source.droppableId;
    const sourceIndex = result.source.index;
    const cloneListCards_1 = [...listCards_1];
    const cloneListCards_2 = [...listCards_2];

    console.log("destinationId: ", destinationId);
    console.log("sourceId: ", sourceId);

    if (destinationId === "list-1" && sourceId === "list-1") {
      const cloneListCards = [...listCards_1];

      cloneListCards.splice(
        destinationIndex,
        0,
        cloneListCards.splice(sourceIndex, 1)[0]
      );
      setListCards_1(cloneListCards);
    }
    if (destinationId === "list-2" && sourceId === "list-2") {
      const cloneListCards = [...listCards_2];

      cloneListCards.splice(
        destinationIndex,
        0,
        cloneListCards.splice(sourceIndex, 1)[0]
      );
      setListCards_2(cloneListCards);
    }
    if (destinationId === "all-list" && sourceId === "all-list") {
      const cloneColums = [...columns];

      cloneColums.splice(
        destinationIndex,
        0,
        cloneColums.splice(sourceIndex, 1)[0]
      );
      setColumns(cloneColums);
    }
    if (sourceId === "list-1" && destinationId === "list-2") {
      cloneListCards_1.splice(sourceIndex, 1);
      cloneListCards_2.splice(destinationIndex, 0, result.draggableId);
      console.log("cloneListCards_1: ", cloneListCards_1);
      console.log("cloneListCards_2: ", cloneListCards_2);
      setListCards_1(cloneListCards_1);
      setListCards_2(cloneListCards_2);
    }
    if (sourceId === "list-2" && destinationId === "list-1") {
      cloneListCards_2.splice(sourceIndex, 1);
      cloneListCards_1.splice(destinationIndex, 0, result.draggableId);
      console.log("cloneListCards_1: ", cloneListCards_1);
      console.log("cloneListCards_2: ", cloneListCards_2);
      setListCards_1(cloneListCards_1);
      setListCards_2(cloneListCards_2);
    }
  }
  function onConfirm(listId) {
    console.log("before data.columns: ", data.columns);
    const dataColumns = [...data.columns];
    const listIndex = dataColumns.findIndex((index) => index === listId);
    dataColumns.splice(listIndex, 1);
    setColumns(dataColumns);
    console.log("listIndex: ", listIndex);
    console.log("data.columns: ", data.columns);
    console.log("columns: ", columns);
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

      <ModalCard open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
