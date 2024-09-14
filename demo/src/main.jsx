import { createRoot } from 'react-dom/client';
import res from '@tencent/daryl-store';

const root = createRoot(document.getElementById('root'));
debugger;

export const comCurMsgId = createContainer('', 'comCurMsgId'); // 最新的消息id
const App = () => {
  return <h1>Hello World</h1>;
};

createRoot(document.getElementById('root')).render(<App />);
