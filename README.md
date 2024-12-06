## 基于unstated-next 封装的状态管理工具

如何实践？

对需要状态管理的对象进行申明
```js
// store.js
// 声明
import { setStoreBaseData } from 'daryl-store';

export default setStoreBaseData({ num1: 10, num2: 10 });
```

使用时，只会更新当前组建的使用，并不会更新同一<ComposedProvider/>下包裹的其他组建

```js
// main.jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ComposedProvider } from 'daryl-store';

createRoot(document.getElementById('root')).render(
  <ComposedProvider>
    <App />
  </ComposedProvider>
);
```

```js
// App.jsx
// 使用
import storeData from './store';

const MinusCom = () => {
  // 更新 MinusCom 组建时，只会渲染更新当前组建
  const [num, setTodos] = storeData.num1.useContainer();
  return (
    <h2 onClick={() => setTodos(nums => nums - 1)}>
      MinusCom {num} {Math.random()}
    </h2>
  );
};
const AddCom = () => {
  const [num, setTodos] = storeData.num2.useContainer();
  return (
    <h2 onClick={() => setTodos(nums => nums + 1)}>
      AddCom {num}
      {Math.random()}
    </h2>
  );
};

const DemoCom = () => {
  return <h2>{Math.random()}</h2>;
};
const App = () => {
  return (
    <div>
      <MinusCom />
      <DemoCom />
      <AddCom />
    </div>
  );
};

export default App;
```
如何在jsx之外获取state呢？


相比 `unstated-next` 更加tiny、更加易学习，更加便捷
