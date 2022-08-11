import { createContext } from "react";
interface contextType {
  dispacth: Function;
}

export const Context = createContext<contextType | undefined>(undefined);
