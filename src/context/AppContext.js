import React, { useState } from "react";
import { initialData } from "../components/data";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [trackers, setTrackers] = React.useState(initialData);
  const [modal, setModal] = useState(null);

  // fectch list todos
  React.useEffect(() => {
    fetch('https://cms-system-express-hpiu.vercel.app/api/todo')
      .then(res => res.json())
      .then(data => {
        const todos = data.data;
        console.log('todos: ', todos)
        const listItem = {
          id: "list-1",
          title: "List 1",
          cards: todos.map(todo => todo._id),
        }
        const cards = todos.reduce((acc, currItem) => {
          acc[currItem._id] = currItem;
          return acc;
        }, {})
        
        setTrackers(prevState => {
          return {
            ...prevState,
            columns: [].concat(listItem.id), // ['list-1']
            lists: {
              ...prevState.lists,
              [listItem.id]: listItem
            },
            cards
          }
        })
      })
      .catch(err => {
        // set state error
      })
  }, [])

  console.log('trackers: ', trackers)

  function handleDragList(result) {
    const { source, destination } = result;
    const columns = [...trackers.columns];
    const listSpliced = columns.splice(source.index, 1)[0];
    columns.splice(destination.index, 0, listSpliced); // add new item
    setTrackers((prevState) => ({
      ...prevState,
      columns,
    }));
  }

  function handleDragCard(result) {
    const { source, destination } = result;
    console.log("result: ", result);

    if (source.droppableId === destination.droppableId) {
      const cards = trackers.lists[source.droppableId].cards;
      const cardMove = cards.splice(source.index, 1);
      cards.splice(destination.index, 0, cardMove[0]);
      setTrackers((prevState) => ({
        ...prevState,
      }));
    }

    if (source.droppableId != destination.droppableId) {
      const sourceCards = [...trackers.lists[source.droppableId].cards];
      const destinationCards = [
        ...trackers.lists[destination.droppableId].cards,
      ];
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;
      const cardMove = sourceCards.splice(sourceIndex, 1);
      destinationCards.splice(destinationIndex, 0, cardMove[0]);
      const { lists } = trackers;
      lists[source.droppableId].cards = sourceCards;
      lists[destination.droppableId].cards = destinationCards;
      setTrackers((prevState) => {
        console.log("prevState: ", prevState);
        return {
          ...prevState,
        };
      });
    }
  }

  function handleDeleteList(listId) {
    const columns = [...trackers.columns];
    const indexList = columns.findIndex((index) => index === listId);
    columns.splice(indexList, 1);
    console.log(columns);
    setTrackers((prevState) => ({ ...prevState, columns }));
  }

  function handleDeleteCard(cardId, columnsId) {
    console.log(trackers.lists[columnsId]);
    const cards = trackers.lists[columnsId].cards;
    const cardIndex = cards.findIndex((index) => index === cardId);
    cards.splice(cardIndex, 1);
    console.log(cards);
    setTrackers((prevState) => ({ ...prevState }));
  }

  function handleTakeIdAddList() {
    // console.log("idAddList: ", idAddList);
    // setIdAddList(idAddList);
  }

  function handleAddCard({ listId, values }) {
    if (modal.type === "ADD_CARD") {
      const card = {
        ...values,
        id: `card-${Date.now()}`,
      };
      console.log("valueAdd: ", values);
      trackers.lists[listId].cards.push(card.id);
      console.log("trackers: ", trackers);

      const cards = {
        ...trackers.cards,
        [card.id]: {
          id: card.id,
          title: card.title,
          description: card.description,
          member: [
            {
              id: card.member,
              name: card.member,
            },
          ],
        },
      };
      setTrackers((prevState) => ({ ...prevState, cards }));

      console.log("cards: ", cards);
    }
    if (modal.type === "EDIT_CARD") handleEditCard();
  }

  function handleEditCard(values) {
    const id = modal.card.id;
    const editCard = { ...values, id };
    trackers.cards[id] = editCard;
    setTrackers((prevState) => ({ ...prevState }));
  }

  function handleAddList(value) {
    console.log("handleAddListConText: ", value);
    // const { columns } = trackers;
    // columns.push(value);
    // console.log("columns: ", columns);

    // const lists = {
    //   ...trackers.lists,
    //   [`list-${Date.now()}`]: {
    //     id: `list-${Date.now()}`,
    //     title: value,
    //     cards: [],
    //   },
    // };
    // setTrackers((prevState) => ({ ...prevState, lists }));
    // console.log("cardssss: ", lists[lists.id].cards);

    setTrackers(prevState => {
      const nameList = `${value}-${Date.now()}`;
      return {
        ...prevState,
        columns: [...prevState.columns, nameList],
        lists: {
          ...prevState.lists,
          [nameList]: {
            id: nameList,
            title: value,
            cards: [],
          }
        }
      }
    })
  }

  console.log("modalAppContext: ", modal);
  console.log("trackers: ", trackers);
  return (
    <AppContext.Provider
      value={{
        // states
        trackers,
        modal,
        setModal,
        // actions
        handleDragList,
        handleDragCard,
        handleDeleteList,
        handleDeleteCard,
        handleAddCard,
        handleTakeIdAddList,
        handleEditCard,
        handleAddList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
