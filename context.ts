import { createContext, useContext } from "react";

export const ServerContext = createContext<{
  origin: string;
  cache: Map<string, any>;
} | null>(null);

export const useServerContext = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error("Missing server context");
  }
  return context;
};
