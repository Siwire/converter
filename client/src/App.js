import './App.css';
import { Provider } from 'react-redux';
import configereStore from './redux/configureStore';
import Main from './components/Main';

const store = configereStore(/* provide initial state if any */)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main></Main>
      </Provider>

    </div>
  );
}

export default App;
