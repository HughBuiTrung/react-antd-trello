import React from "react";
import { data } from "../components/data";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [trackers, setTrackers] = React.useState(data);

  function handleDragList(result) {
    const { source, destination } = result;
    const columns = [...trackers.columns];
    const listSpliced = columns.splice(source.index, 1)[0];
    columns.splice(destination.index, 0, listSpliced); // add new item
    setTrackers(prevState => ({
      ...prevState,
      columns
    }))
  }

  function handleDragCard(result) {
    const { source, destination } = result;

  }

  return (
    <AppContext.Provider 
      value={{
        // states
        trackers,

        // actions
        handleDragList,
        handleDragCard
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => React.useContext(AppContext);
