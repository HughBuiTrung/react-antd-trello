import React from "react";
import { data } from "../components/data";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [trackers, setTrackers] = React.useState(data);
  const [idAddList, setIdAddList] = React.useState();
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
  function handleTakeIdAddList(idAddList) {
    console.log("idAddList: ", idAddList);
    setIdAddList(idAddList);
  }
  function handleAddCard(value) {
    // const indexList = trackers.columns.indexOf(idAddList);
    // trackers.lists[idAddList].cards.push(value);
    const { title, description, member } = value;
    console.log("title: ", title);
    console.log("value: ", value);
    console.log("idAddList: ", idAddList);
  }

  // console.log("idAddList: ", idAddList);

  console.log("trackers: ", trackers);
  return (
    <AppContext.Provider
      value={{
        // states
        trackers,

        // actions
        handleDragList,
        handleDragCard,
        handleDeleteList,
        handleDeleteCard,
        handleAddCard,
        handleTakeIdAddList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
