import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { dbStores } from '../../utils';
import { IRelation } from '../../interfaces/interfaces';

// const ADD_RELATION = 'relationship/addRelation';
// const REMOVE_RELATION = 'relationship/removeRelation';
const INIT_STORE = 'relationship/initialize';
const UPDATE_RELATIONS = 'relationship/update';

const relationshipSlice = createSlice({
  name: 'relations' as string,
  initialState: [] as Array<any>,
  reducers: {
    [INIT_STORE]: (state, action) => {
      state.splice(0, 1);
    },
    [UPDATE_RELATIONS]: (state, action) => {
      state.push('updated');
    },
  },
});

export const _actions = relationshipSlice.actions;

export const initializeRelationsStore = (): AppThunk => {
  return (dispatch) => {
    dispatch(_actions[INIT_STORE]([]));
  };
};

export const createRelationship = (newRelations: IRelation[]): AppThunk => {
  return (dispatch) => {
    if (newRelations.length) {
      // generate db attendance file if they doesn't exist
      // dispatch(generateAttendanceDocs(newRelations[0].siteId));

      // generate attendance data for each worker
      // by default if there is no record, that means that the worker is present
      // of
      // dispatch(generateAttendanceDataForWorker(newRelations));
    }

    // save data to the database
    dbStores.relations.insert(
      newRelations,
      (err: any, newRelationFromDB: IRelation) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          dispatch(_actions[UPDATE_RELATIONS](newRelationFromDB));
        }
      }
    );
  };
};

export const removeRelationship = (rmRelations: Array<IRelation>): AppThunk => {
  return (dispatch, getState) => {
    const { relations } = getState();
    // let pastRelations = [...relations.map((v: IRelation) => v)];

    // remove data from database
    rmRelations.map((rel) =>
      dbStores.relations.remove(rel, (err: any) => {
        if (err) {
          console.log(err);
        }
      })
    );

    // dispatch action to update store data
    dispatch(_actions[UPDATE_RELATIONS]([]));
  };
};

export const findRelationFromSiteId = (
  siteId: number,
  cb: Function
): AppThunk => {
  return (dispatch) => {
    dbStores.relations.find({ siteId }, (err: any, relations: IRelation[]) => {
      if (err) {
        console.log(err);
      } else {
        cb(relations);
        dispatch(_actions[INIT_STORE](relations));
      }
    });
  };
};

export default relationshipSlice.reducer;

export const selectRelationship = (state: RootState) => state.relations;

export const relationshipActions = _actions;
