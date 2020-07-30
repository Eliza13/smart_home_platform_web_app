import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// redux setup
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import devicesReducer from './store/reducers/devices';
import divisionReducer from './store/reducers/division';
import routinesReducer from './store/reducers/routines';
import tileReducer from './store/reducers/tile';
import metricsReducer from './store/reducers/metrics';
import authReducer from './store/reducers/auth';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; 

const rootReducer = combineReducers({
    devices: devicesReducer,
    division: divisionReducer,
    routines: routinesReducer,
    metrics: metricsReducer,
    tile: tileReducer,
    auth: authReducer
});

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
