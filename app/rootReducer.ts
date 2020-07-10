import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import workersReducer from './features/workers/workerSlice';
import sitesReducer from './features/sites/siteSlice';
import relationsReducer from './features/relations/relationshipSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    workers: workersReducer,
    sites: sitesReducer,
    relations: relationsReducer,
  });
}
