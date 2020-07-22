import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { dbStores } from '../../utils';
import { IRelation } from '../../interfaces/interfaces';

// const ADD_RELATION = 'relationship/addRelation';
// const REMOVE_RELATION = 'relationship/removeRelation';
const ACTIONS = {
  INIT_STORE: 'relationship/initialize',
  INSERT_RELATIONS: 'relationship/update',
  REMOVE_RELATIONS: 'relationship/remove',
  RESET: 'relationship/reset',
};

const intialState = [] as Array<IRelation>;

const relationshipSlice = createSlice({
  name: 'relations' as string,
  initialState: intialState,
  reducers: {
    [ACTIONS.INIT_STORE]: (state, action) => {
      // if (state.length) action.payload.map((r: IRelation) => state.push(r));
      state.push(...action.payload);
      console.log('INIT_STORE', action.payload);
    },
    [ACTIONS.INSERT_RELATIONS]: (state, action) => {
      console.log('INSERT_RELATIONS', action.payload);
      // state.splice(0, state.length-1)
      state.push(...action.payload);

    },
    [ACTIONS.REMOVE_RELATIONS]: (state, action) => {
      state.push(...action.payload);
    },
    [ACTIONS.RESET]: (state, action) => intialState,
  },
});

export const _actions = relationshipSlice.actions;

export const initializeRelationsStore = (): AppThunk => {
  return (dispatch) => {
    dbStores.relations.find({}, (err: any, relations: any) => {
      if (err) {
        console.log(err);
      } else {
        // dispatch action to update store data
        dispatch(_actions[ACTIONS.RESET]([]));
        dispatch(_actions[ACTIONS.INIT_STORE](relations));
        console.log('initializeRelationsStore', relations);
      }
    });
  };
};

export const createRelationship = (newRelations: IRelation[]): AppThunk => {
  return (dispatch, getState) => {
    if (newRelations.length) {
      // generate db attendance file if they doesn't exist
      // dispatch(generateAttendanceDocs(newRelations[0].siteId));
      // generate attendance data for each worker
      // by default if there is no record, that means that the worker is present
      // of
      // dispatch(generateAttendanceDataForWorker(newRelations));
    }

    const { relations } = getState();

    // save data to the database
    dbStores.relations.insert(
      newRelations,
      (err: any, newRelationFromDB: IRelation) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          dispatch(_actions[ACTIONS.INSERT_RELATIONS](newRelationFromDB));
          console.log('insert', newRelationFromDB);
        }
      }
    );
  };
};

export const removeRelationship = (rmRelations: Array<IRelation>): AppThunk => {
  return (dispatch, getState) => {
    const { relations } = getState();
    // let pastRelations = [...relations.map((v: IRelation) => v)];
    let updatedRelations = [...relations];

    console.log('updatedRelations', updatedRelations);

    // remove data from database
    rmRelations.map((rel) => {
      // filter state
      updatedRelations = updatedRelations.filter(
        (el: IRelation) =>
          !(el.siteId === rel.siteId && el.workerId === rel.workerId)
      );
      let { workerId, siteId } = rel;

      // remove from db
      dbStores.relations.remove({ workerId, siteId }, (err: any) => {
        if (err) {
          console.log(err);
        }
      });
    });

    console.log('removeRelationship', updatedRelations);

    // dispatch action to update store data
    dispatch(_actions[ACTIONS.RESET]([]));
    dispatch(_actions[ACTIONS.REMOVE_RELATIONS](updatedRelations));
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
        // dispatch(_actions[INIT_STORE](relations));
      }
    });
  };
};

export default relationshipSlice.reducer;

export const selectRelationship = (state: RootState) => state.relations;

export const relationshipActions = [_actions, ACTIONS];
