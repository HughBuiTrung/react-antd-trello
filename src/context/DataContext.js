import React from "react";
import { data } from "../components/data";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useAppContext = () => React.useContext(AppContext);
