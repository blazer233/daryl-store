import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

const containers = [];

export const manageGlobalState = () => {
  const listeners = {};
  return {
    delete: key => delete listeners[key],
    get: key => (key ? listeners[key] : listeners),
    set: (key, val) => (listeners[key] = val),
  };
};

const globalState = manageGlobalState();

export const createContainer = (defaultValue, defaultName = '') => {
  const Context = createContext({});
  const container = {
    useContainer: () => useContext(Context),
    Provider: ({ children }) => {
      const [state, dispatch] = useReducer(
        (state, action) => typeof action === 'function' ? action(state) : action,
        defaultValue
      );
      useEffect(() => {
        globalState.set(defaultName, state);
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
