import { createSlice, createAction, nanoid } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { IWorker } from '../../interfaces/interfaces';
import { AppThunk, RootState } from '../../store';
import { dbStores } from '../../utils/index';

const INIT_STORE = 'worker/initialize';
const CREATE_WORKER = 'worker/createWorker';
// const GET_ALL_WORKERS = 'worker/get_all_workers';
// const GET_WORKER = 'worker/get_worker';
// const UPDATE_WORKER = 'worker/update_worker';
// const DELETE_WORKER = 'worker/delete_worker';

const workerSlice = createSlice({
  name: 'workers' as string,
  initialState: [] as IWorker[],
  reducers: {
    [INIT_STORE]: (state, action) => {
      state.push(...action.payload);
    },
    [CREATE_WORKER]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const _actions = workerSlice.actions;

export const initializeWorkersStore = (): AppThunk => {
  return (dispatch, getState) => {
    // check if the data store is already populated
    if (getState().workers === undefined || getState().workers.length === 0) {
      // save data to the database
      dbStores.workers.find({}, (err: any, workers: any) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          dispatch(_actions[INIT_STORE](workers));
        }
      });
    }
  };
};

export const createNewWorker = (newWorker: IWorker): AppThunk => {
  return (dispatch) => {
    // save data to the database
    dbStores.workers.insert(newWorker, (err: any, newWorkerFromDB: IWorker) => {
      if (err) {
        console.log(err);
      } else {
        // dispatch action to update store data
        dispatch(_actions[CREATE_WORKER](newWorkerFromDB));
      }
    });
  };
};

// export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increment());
//   }, delay);
// };

export default workerSlice.reducer;

export const selectWorkers = (state: RootState) => state.workers;

export const workersActions = _actions;
