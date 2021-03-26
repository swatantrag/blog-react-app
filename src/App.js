import './assets/style.scss';
import { Provider } from 'react-redux';
import Store from './components/store/store';
import Listing from './components/listing';

function App() {
  return (
    <Provider store={Store}>
      <div className="app">
        <Listing />
      </div>
    </Provider>
  );
}

export default App;
