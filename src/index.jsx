import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
      const value = useMemo(() => [state, dispatch], [state]);
      return <Context.Provider value={value}>{children}</Context.Provider>;
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

export const handleStoreBaseData = storeTemp => {
  let temp = {};
  for (const key in storeTemp) {
    temp[key] = createContainer(storeTemp[key], key);
  }
  return temp;
};

export const useGlobalState = () => useContext(GlobalStateContext);
