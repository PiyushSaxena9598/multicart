"use client";
import { createContext, useState } from "react";

export const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
