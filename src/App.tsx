import './index.scss';
import Header from './modules/dashboard/components/Header/Header';

const App: React.FC = () => (
  <>
    <Header text='Hello world' />
    <div className='app'></div>
  </>
);

export default App;
