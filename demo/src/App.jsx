import { memo } from 'react';
import StoreData from './store';

const MinusCom = () => {
  const [, setTodos] = StoreData.comNum.useContainer();
  return <h2 onClick={() => setTodos(nums => nums - 1)}>-</h2>;
};
const AddCom = memo(() => {
  const [, setTodos] = StoreData.comNum.useContainer();
  return <h2 onClick={() => setTodos(nums => nums + 1)}>+</h2>;
});
const App = () => {
  const [nums] = StoreData.comNum.useContainer();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
      }}
    >
      <h1>{nums}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <MinusCom />
        <AddCom />
      </div>
    </div>
  );
};

export default App;
