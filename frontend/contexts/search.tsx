import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext({
  searchText: '',
  setSearchText: () => undefined,
});

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('You forgot SearchProvider!');
  }
  return context;
}

export default function SearchProvider(props) {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
