
import React, { useState, useCallback } from 'react';
import { Card, Tooltip, Button, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// components
import { TodoCard } from './components/TodoCard';
import ModalCard from './components/ModalCard';

// mock data
import { data } from './data';

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [open, setOpen] = useState(false);
 
  const onDragEnd = (result) => {
    console.log('onDragEnd', result)
    // the only one that is required
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
              <DragDropContext
                onDragEnd={onDragEnd}
              >
                <Droppable droppableId="all-lists" direction='horizontal' type="LIST">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      className="listContainer"
                      {...provided.droppableProps}
                    >
                      {data.columns.map((columnId, index) => {
                        const listItem = data.lists[columnId];
                        const cards = listItem.cards.map((cardId) => data.cards[cardId]);
                        const listId = listItem.id;
                        const title = listItem.title;

                        return (
                          <React.Fragment key={listId}>
                            <Draggable draggableId={String(listId)} index={index}>
                              {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Droppable droppableId={String(listId)} type="CARD">
                                      {(provided) => (
                                        <Card title={title}
                                          className="cardList"
                                          extra={
                                            <>
                                              <Tooltip title="Add a card">
                                                <Button shape="circle" icon={<PlusOutlined />} onClick={() => setOpen(true)} />
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
                                                  <Button shape="circle" icon={<DeleteOutlined />} />
                                                </Tooltip>
                                              </Popconfirm>
                                            </>
                                          } 
                                        >
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                              {cards.map((card, cardIndex) => {
                                                return (
                                                  <TodoCard 
                                                    key={card.id} 
                                                    index={cardIndex} 
                                                    card={card}
                                                    setOpen={setOpen}
                                                  />
                                                )
                                              })}
                                          </div>
                                          {provided.placeholder}
                                        </Card>
                                      )}
                                    </Droppable>
                                </div>
                              )}
                            </Draggable>
                          </React.Fragment>
                  
                        )
                      })}
                      
                      {provided.placeholder}

                    </div>
                  )}
                </Droppable>


              </DragDropContext>
              <Button type="text"><PlusOutlined /> Add another list</Button>
             
            
            </div>
          </div>
        </main>
        
        <ModalCard 
          open={open}
          setOpen={setOpen}
        />
    </>
  );
}

export default App;
