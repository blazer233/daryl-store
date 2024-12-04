import React, {
  createContext as createContextOrig,
  useContext as useContextOrig,
  useLayoutEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';

const createProvider = ProviderOrig => {
  return ({ value, children }) => {
    console.log(value);
    const contextValue = useRef({ value, listeners: new Set() });

    useLayoutEffect(() => {
      contextValue.current.value = value;
      contextValue.current.listeners.forEach(listener => listener());
    }, [value]);

    return <ProviderOrig value={contextValue.current}>{children}</ProviderOrig>;
  };
};

export const createContext = defaultValue => {
  const context = createContextOrig({
    value: defaultValue,
    listeners: new Set(),
  });
  context.Provider = createProvider(context.Provider);
  return context;
};

export const useContextSelector = (
  context,
  selector,
  equalityFn = Object.is
) => {
  const { value, listeners } = useContextOrig(context);

  const subscribe = useCallback(
    callback => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    [listeners]
  );

  const getSnapshot = useCallback(() => {
    const nextSnapshot = selector(value);
    const prevSnapshot = useRef(selector(value)).current;
    return equalityFn(prevSnapshot, nextSnapshot) ? prevSnapshot : nextSnapshot;
  }, [value, selector, equalityFn]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
