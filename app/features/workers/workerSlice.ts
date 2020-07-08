import { createSlice, createAction, nanoid } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { IWorker } from '../../interfaces/interfaces';
import { AppThunk, RootState } from '../../store';

const CREATE_WORKER = 'worker/createWorker';
// const GET_ALL_WORKERS = 'worker/get_all_workers';
// const GET_WORKER = 'worker/get_worker';
// const UPDATE_WORKER = 'worker/update_worker';
// const DELETE_WORKER = 'worker/delete_worker';

const workerSlice = createSlice({
  name: 'workers' as string,
  initialState: [] as any[],
  reducers: {
    [CREATE_WORKER]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const _actions = workerSlice.actions;

export const createNewWorker = (newWorker: IWorker): AppThunk => {
  console.log(newWorker)
  return (dispatch, getState) => {
    const state = getState();
    const newState: Array<IWorker> = state.workers.concat(newWorker);
    dispatch(_actions[CREATE_WORKER](newState as Array<IWorker>));
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
