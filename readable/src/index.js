import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
//import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import  thunk  from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/*
const logger = store => next => action => {
      console.group(action.type)
      console.info('dispatching', action)
      let result = next(action)
          console.log('next state', store.getState())
          console.groupEnd(action.type)
          return result
        }
*/

const store = createStore(
    reducers,
      composeEnhancers(
        applyMiddleware(thunk)
      )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
)

//registerServiceWorker();
