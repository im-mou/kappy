import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { dbStores } from '../../utils';
import { IRelation, ISite } from '../../interfaces/interfaces';

const INIT_STORE = 'relationship/addRelation';
const ADD_RELATION = 'relationship/initialize';

const relationshipSlice = createSlice({
  name: 'relations' as string,
  initialState: [] as IRelation[],
  reducers: {
    [INIT_STORE]: (state, action) => {
      state.push(action.payload);
    },
    [ADD_RELATION]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const _actions = relationshipSlice.actions;

export const createNewRelationship = (
  workersIds: Array<number>,
  siteId: number
): AppThunk => {
  // Prepare data for DB
  let newRelation: IRelation[] = [];
  console.log(workersIds)
  workersIds.map((workerId) => {
    newRelation.push({ workerId, siteId });
  });

  return (dispatch) => {
    // save data to the database
    dbStores.relations.insert(
      newRelation,
      (err: any, newRelationFromDB: IRelation) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          console.log(newRelationFromDB);
          // dispatch(_actions[ADD_RELATION](newRelationFromDB));
        }
      }
    );
  };
};

export const initializeRelationsStore = (): AppThunk => {
  return (dispatch, getState) => {
    // check if the data store is already populated
    if (
      getState().relations === undefined ||
      getState().relations.length === 0
    ) {
      // save data to the database
      dbStores.relations.find({}, (err: any, relations: IRelation) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          dispatch(_actions[INIT_STORE](relations));
        }
      });
    }
  };
};
export default relationshipSlice.reducer;

export const selectRelationship = (state: RootState) => state.relations;

export const relationshipActions = _actions;
