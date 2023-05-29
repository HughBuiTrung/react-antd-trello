import React, { useEffect, useState } from "react";
import { initialData } from "../components/data";
import App from "../App";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [trackers, setTrackers] = React.useState(initialData);
  const [modal, setModal] = useState(null);
  const [flag, setFlag] = useState(0);
  const [columns, setColums] = useState();
  // fectch lists todos users
  React.useEffect(() => {
    const getData = [
      fetch("https://cms-system-express.vercel.app/api/todo"),
      fetch("https://cms-system-express.vercel.app/api/list"),
    ];
    const loadData = async () => {
      try {
        const res = await Promise.all(getData);
        const data = await Promise.all(
          res.map((item) => {
            return item.json();
          })
        );
        console.log(data);
        const getTodos = data[0].data;
        const getLists = data[1].data;

        // CARDS
        const cards = getTodos.reduce((acc, currItem) => {
          acc[currItem._id] = currItem;
          return acc;
        }, {});

        // LISTS
        const lists = getLists.reduce((acc, currItem) => {
          acc[currItem._id] = currItem;
          return acc;
        }, {});

        // COLUMNS
        const columns = getLists.map((list) => list._id);

        // SET DATA
        setTrackers((prevState) => {
          return {
            ...prevState,
            columns: columns,
            lists: lists,
            cards,
          };
        });
      } catch (err) {
        console.log("Multiple fetch failed");
      }
    };
    loadData();

    console.log("useEffect============================");
  }, [flag]);

  // Add Card
  function handleAddCard({ listId, values }) {
    console.log(modal);

    console.log(listId);
    console.log(values);
    if (modal.type === "ADD_CARD") {
      console.log("AddCard");

      fetch("https://cms-system-express.vercel.app/api/todo", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const newCard = json.data;

          fetch(`https://cms-system-express.vercel.app/api/list/${listId}`, {
            method: "PUT",
            body: JSON.stringify({
              cards: [...trackers.lists[listId].cards, newCard._id],
              //  newCard._id
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
          trackers.lists[listId].cards.push(newCard._id);
          const cards = {
            ...trackers.cards,
            [newCard._id]: {
              id: newCard._id,
              title: newCard.title,
              description: newCard.description,
              member: newCard.member,
            },
          };
          setTrackers((prevState) => ({ ...prevState, cards }));
        });

      console.log("value: ", values);

      console.log("ADD_CARD");
      setTimeout(() => {
        console.log("timeOut");
        setFlag(flag + 1);
      }, 1000);
    }

    if (modal.type === "EDIT_CARD") {
      handleEditCard(values);
    }
    console.log("modal.type: ", modal.type);
  }
  // Edit Card
  function handleEditCard(values) {
    console.log("EditCard", values);
    console.log(modal);
    const id = modal.card._id;
    console.log(id);
    fetch(`https://cms-system-express.vercel.app/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: values.title,
        description: values.description,
        member: values.member,
        status: values.status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    const editCard = { ...values, id };
    trackers.cards[id] = editCard;
    setTrackers((prevState) => ({ ...prevState }));
    setTimeout(() => {
      console.log("timeOut");
      setFlag(flag + 1);
    }, 1000);
  }

  // Drag List
  function handleDragList(result) {
    console.log(result);
    const { source, destination } = result;
    const columns = [...trackers.columns];
    const listSpliced = columns.splice(source.index, 1)[0];
    console.log(listSpliced);
    columns.splice(destination.index, 0, listSpliced); // add new item
    setTrackers((prevState) => ({
      ...prevState,
      columns,
    }));
    console.log(columns);
  }

  // Drag Card
  function handleDragCard(result) {
    console.log(result);

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const cards = trackers.lists[source.droppableId].cards;
      const cardMove = cards.splice(source.index, 1);
      cards.splice(destination.index, 0, cardMove[0]);
      console.log(": ", cards);
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

  // Add List
  function handleAddList(value) {
    console.log("handleAddListConText: ", value);
    fetch("https://cms-system-express.vercel.app/api/list", {
      method: "POST",
      body: JSON.stringify({
        title: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((list) =>
        setTrackers((prevState) => {
          const nameList = list.data._id;
          return {
            ...prevState,
            columns: [...prevState.columns, nameList],
            lists: {
              ...prevState.lists,
              [nameList]: {
                id: nameList,
                title: value,
                cards: [],
              },
            },
          };
        })
      );
    setTimeout(() => {
      console.log("timeOut");
      setFlag(flag + 1);
    }, 1000);
  }

  // Delete List
  function handleDeleteList(listId) {
    console.log("listId", listId);
    fetch(`https://cms-system-express.vercel.app/api/list/${listId}`, {
      method: "DELETE",
    });
    const columns = [...trackers.columns];
    const indexList = columns.findIndex((index) => index === listId);
    columns.splice(indexList, 1);
    setTrackers((prevState) => ({ ...prevState, columns }));
    setTimeout(() => {
      console.log("timeOut");
      setFlag(flag + 1);
    }, 1000);
    console.log(trackers.lists[listId]);
  }

  // Delete Card
  function handleDeleteCard(cardId, columnsId) {
    const listCard = trackers.lists[columnsId].cards;
    const indexCard = listCard.findIndex((element) => element === cardId);
    listCard.splice(indexCard, 1);

    fetch(`https://cms-system-express.vercel.app/api/todo/${cardId}`, {
      method: "DELETE",
    });
    fetch(`https://cms-system-express.vercel.app/api/list/${columnsId}`, {
      method: "PUT",
      body: JSON.stringify(trackers.lists[columnsId]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setTimeout(() => {
      console.log("timeOut");
      setFlag(flag + 1);
    }, 500);
    // console.log(trackers.lists[columnsId]);
    // const cards = trackers.lists[columnsId].cards;
    // const cardIndex = cards.findIndex((index) => index === cardId);
    // cards.splice(cardIndex, 1);
    // console.log(cards);
    // setTrackers((prevState) => ({ ...prevState }));
  }
  console.log(trackers.columns[0]);

  console.log("flag: ", flag);
  console.log("tracker: ", trackers);
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
        handleEditCard,
        handleAddList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
