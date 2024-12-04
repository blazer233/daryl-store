import { useState } from 'react';
import { createContext, useContextSelector } from 'daryl-store';

// 注意这里用的是 use-context-selector 的 createContext
const Context = createContext(null);
const Demo = () => {
  return <div>{Math.random()}</div>;
};
// 使用 Context.Provider 将 count1 和 count2 传递到子孙组件
const StateProvider = ({ children }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <Context.Provider
      value={{
        count1,
        setCount1,
        count2,
        setCount2,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const Counter1 = () => {
  const count1 = useContextSelector(Context, v => v.count1);
  const setCount1 = useContextSelector(Context, v => v.setCount1);
  return (
    <div>
      <span>
        count1: {count1}
        {Math.random()}
      </span>
      <button onClick={() => setCount1(n => n + 1)}>add count1</button>
    </div>
  );
};

const Counter2 = () => {
  const count2 = useContextSelector(Context, v => v.count2);
  const setCount2 = useContextSelector(Context, v => v.setCount2);
  return (
    <div>
      <span>count2: {count2}</span>
      <button onClick={() => setCount2(n => n + 1)}>add count2</button>
    </div>
  );
};

const App = () => {
  return (
    <StateProvider>
      <Counter1 />
      <Counter2 />
      <Demo />
    </StateProvider>
  );
};

export default App;
