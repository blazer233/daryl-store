import { ReactNode, createContext, createElement, useContext, useState, FC, useEffect } from 'react';

interface Container {
  useContainer: () => any;
  Provider: (props: { children: ReactNode }) => JSX.Element;
}
const handleContentVal = () => {
  const listeners: any = {};
  return {
    delete: (key: string) => delete listeners[key],
    get: (key: string) => (key ? listeners[key] : listeners),
    set: (key: string, val: any) => (listeners[key] = val),
  };
};
export const globalSelfState = handleContentVal();

const conts: Container[] = [];

// 状态管理
export const createContainer = (defaultValue: any, defName = '') => {
  const Context = createContext<any>({});
  const temp: Container = {
    useContainer: () => useContext(Context),
    Provider: ({ children }: { children: ReactNode }) => {
      const value = useState(defaultValue);
      const [state] = value;
      useEffect(() => {
        globalSelfState.set(defName, state);
      }, [state]);
      return createElement(Context.Provider, { value }, children);
    },
  };
  conts.push(temp);
  return temp;
};

export const ComposeProvider: FC<any> = ({ children }) => {
  return conts.reduceRight((child, { Provider }) => createElement(Provider, null, child), children);
};

export default {}

