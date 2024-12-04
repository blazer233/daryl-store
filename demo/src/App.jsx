import StoreData from './store';

const MinusCom = () => {
  const [, setTodos] = StoreData.comNum.useContainer();
  return <h2 onClick={() => setTodos(nums => nums - 1)}>MinusCom</h2>;
};
const AddCom = () => {
  const [, setTodos] = StoreData.comNum.useContainer();
  return <h2 onClick={() => setTodos(nums => nums + 1)}>AddCom</h2>;
};

const DemoCom = () => {
  return <h2>{Math.random()}</h2>;
};
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
        <DemoCom />
        <AddCom />
      </div>
    </div>
  );
};

export default App;
