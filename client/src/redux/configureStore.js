import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createRootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { rootEpic } from './modules/root';
 
export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        epicMiddleware,
      ),
    ),
  )

  epicMiddleware.run(rootEpic);

  return store
}
