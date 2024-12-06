import React, { createContext, useContext, useEffect, useState } from 'react';

const containers = [];
const GlobalStateContext = createContext({});

export const createContainer = (defaultValue, defaultName = '') => {
  const Context = createContext({});
  const container = {
    useContainer: () => useContext(Context),
    Provider: ({ children }) => {
      const globalState = useContext(GlobalStateContext);
      const [state, dispatch] = useState(defaultValue);
      useEffect(() => {
        globalState[defaultName] = state;
      }, [state]);
      return (
        <Context.Provider value={[state, dispatch]}>
          {children}
        </Context.Provider>
      );
    },
  };
  containers.push(container);
  return container;
};

export const ComposedProvider = ({ children }) => {
  return containers.reduceRight(
    (child, { Provider }) => <Provider>{child}</Provider>,
    children
  );
};

export const setStoreBaseData = storeTemp => {
  let temp = {};
  for (const key in storeTemp) {
    temp[key] = createContainer(storeTemp[key], key);
  }
  return temp;
};

export const useGlobalState = () => useContext(GlobalStateContext);
