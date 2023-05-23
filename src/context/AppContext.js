import React, { useEffect, useState } from "react";
import { initialData } from "../components/data";
import App from "../App";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [trackers, setTrackers] = React.useState(initialData);
  const [modal, setModal] = useState(null);
  const [flag, setFlag] = useState(0);
  const [lists, setLists] = useState();
  const [users, setUsers] = useState();
  const [todos, setTodos] = useState();

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
        console.log("getTodos: ", getTodos);
        console.log("getLists: ", getLists);

        const cards = getTodos.reduce((acc, currItem) => {
          acc[currItem._id] = currItem;
          return acc;
        }, {});
        console.log("cardsssssssss: ", cards);
        const lists = getLists.reduce((acc, currItem) => {
          acc[currItem._id] = currItem;
          return acc;
        }, {});
        console.log("listsssssssssss: ", lists);

        const listItem = {
          id: ["list-1"],
          title: "List 1",
          cards: getTodos.map((todo) => todo._id),
        };

        console.log("listItemmmmmmmmmmmmmmmmm: ", listItem);
        setTrackers((prevState) => {
          return {
            ...prevState,
            columns: getLists.map((list) => list._id),
            lists: lists,
            cards,
          };
        });
      } catch (err) {
        console.log("Multiple fetch failed");
      }
    };
    loadData();
    // const todos = data[0].data;
    // console.log("todos: ", todos);
    // console.log("lists: ", lists);
    // const listItem = {
    //   id: "list-1",
    //   title: "List 1",
    //   cards: todos.map((todo) => todo._id),
    // };
    // const cards = todos.reduce((acc, currItem) => {
    //   acc[currItem._id] = currItem;
    //   return acc;
    // }, {});
    // setTrackers((prevState) => {
    //   return {
    //     ...prevState,
    //     columns: [].concat(listItem.id), // ['list-1']
    //     lists: {
    //       ...prevState.lists,
    //       [listItem.id]: listItem,
    //     },
    //     cards,
    //   };
    // });
    console.log("useEffect============================");

    // console.log(todos);
    // console.log(lists);
    // fetch("https://cms-system-express.vercel.app/api/todo")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const todos = data.data;
    //     console.log("todos: ", todos);
    //     console.log("lists: ", lists);
    //     const listItem = {
    //       id: "list-1",
    //       title: "List 1",
    //       cards: todos.map((todo) => todo._id),
    //     };
    //     const cards = todos.reduce((acc, currItem) => {
    //       acc[currItem._id] = currItem;
    //       return acc;
    //     }, {});

    //     setTrackers((prevState) => {
    //       return {
    //         ...prevState,
    //         columns: [].concat(listItem.id), // ['list-1']
    //         lists: {
    //           ...prevState.lists,
    //           [listItem.id]: listItem,
    //         },
    //         cards,
    //       };
    //     });
    //   })
    //   .catch((err) => {
    //     // set state error
    //   });
  }, [flag]);

  // Add Card
  function handleAddCard({ listId, values }) {
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
          console.log("handleAddCard: ", json.data);
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
            .then((json) => console.log("12313123: ", json));
        });

      setFlag(flag + 1);

      console.log("value: ", values);
    }

    // if (modal.type === "ADD_CARD") {
    //   const card = {
    //     ...values,
    //     id: `card-${Date.now()}`,
    //   };
    //   console.log("valueAdd: ", values);
    //   trackers.lists[listId].cards.push(card.id);
    //   console.log("trackers: ", trackers);

    //   const cards = {
    //     ...trackers.cards,
    //     [card.id]: {
    //       id: card.id,
    //       title: card.title,
    //       description: card.description,
    //       member: [
    //         {
    //           id: card.member,
    //           name: card.member,
    //         },
    //       ],
    //     },
    //   };
    //   setTrackers((prevState) => ({ ...prevState, cards }));

    //   console.log("cards: ", cards);
    // }
    if (modal.type === "EDIT_CARD") handleEditCard();
  }

  // Edit Card
  function handleEditCard(values) {
    console.log("EditCard");
    const id = modal.card._id;
    fetch(`https://cms-system-express.vercel.app/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setFlag(flag + 1);
    // const editCard = { ...values, id };
    // trackers.cards[id] = editCard;
    // setTrackers((prevState) => ({ ...prevState }));
  }

  // Drag List
  function handleDragList(result) {
    console.log(result);
    const { source, destination } = result;
    const columns = [...trackers.columns];
    const listSpliced = columns.splice(source.index, 1)[0];
    columns.splice(destination.index, 0, listSpliced); // add new item
    setTrackers((prevState) => ({
      ...prevState,
      columns,
    }));
  }

  // Drag Card
  function handleDragCard(result) {
    const { source, destination } = result;

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

  // Delete List
  function handleDeleteList(listId) {
    console.log(listId);
    fetch(`https://cms-system-express.vercel.app/api/list/${listId}`, {
      method: "DELETE",
    });
    setFlag(flag + 1);
    const columns = [...trackers.columns];
    const indexList = columns.findIndex((index) => index === listId);
    columns.splice(indexList, 1);
    setTrackers((prevState) => ({ ...prevState, columns }));
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

    setFlag(flag + 1);
    // console.log(trackers.lists[columnsId]);
    // const cards = trackers.lists[columnsId].cards;
    // const cardIndex = cards.findIndex((index) => index === cardId);
    // cards.splice(cardIndex, 1);
    // console.log(cards);
    // setTrackers((prevState) => ({ ...prevState }));
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
      .then((list) => console.log("tittleList: ", list.data));
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

    setTrackers((prevState) => {
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
          },
        },
      };
    });
  }
  function handleFlag() {
    setFlag(flag + 1);
  }
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
      <button onClick={handleFlag}>setFlag</button>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
