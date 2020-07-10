import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { ISite } from '../../interfaces/interfaces';
import { dbStores } from '../../utils/index';

const INIT_STORE = 'site/initialize';
const CREATE_SITE = 'site/createSite';

const siteSlice = createSlice({
  name: 'sites' as string,
  initialState: [] as ISite[],
  reducers: {
    [INIT_STORE]: (state, action) => {
      state.push(...action.payload);
    },
    [CREATE_SITE]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const _actions = siteSlice.actions;

export const initializeSitesStore = (): AppThunk => {
  return (dispatch, getState) => {
    // check if the data store is already populated
    if (getState().sites === undefined || getState().sites.length === 0) {
      // save data to the database
      dbStores.sites.find({}, (err: any, sites: any) => {
        if (err) {
          console.log(err);
        } else {
          // dispatch action to update store data
          dispatch(_actions[INIT_STORE](sites));
        }
      });
    }
  };
};


export const createNewSite = (newSite: ISite): AppThunk => {
  return (dispatch) => {
    // save data to the database
    dbStores.sites.insert(newSite, (err: any, newSiteFromDB: ISite) => {
      if (err) {
        console.log(err);
      } else {
        // dispatch action to update store data
        dispatch(_actions[CREATE_SITE](newSiteFromDB));
      }
    });
  };
};

export default siteSlice.reducer;

export const selectSites = (state: RootState) => state.sites;

export const sitesActions = _actions;
