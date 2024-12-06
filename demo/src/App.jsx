import StoreData from './store';

const MinusCom = () => {
  const [num, setTodos] = StoreData.num1.useContainer();
  return (
    <h2 onClick={() => setTodos(nums => nums - 1)}>
      MinusCom {num} {Math.random()}
    </h2>
  );
};
const AddCom = () => {
  const [num, setTodos] = StoreData.num2.useContainer();
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
