import { ipcRenderer } from 'electron';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
// import { db, countMonths } from '../../utils';
import { dbStores } from '../../utils';
import {
  IRelation,
  ISite,
  IAttendance,
  IWorker,
} from '../../interfaces/interfaces';
import dbActions from '../../constants/dbActions.json';

const INIT_STORE = 'attendance/initialize';

const attendanceSlice = createSlice({
  name: 'attendance' as string,
  initialState: [] as Array<any>,
  reducers: {
    [INIT_STORE]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const _actions = attendanceSlice.actions;

export const initializeAttendanceStore = (): AppThunk => {
  return (dispatch, getState) => {
    dispatch(_actions[INIT_STORE]([]));
  };
};

// attendance corresponding to a singular date
export const getAttendance = (query: any[], cb: Function): AppThunk => {
  return (dispatch) => {
    dbStores.attendance.find(query, (err: any, results: IAttendance) => {
      if (err) {
        console.log(err);
      } else {
        cb(results);
        dispatch(_actions[INIT_STORE]([`updated${+Date()}`]));
      }
    });
  };
};

// getAttendanceFromDateAndSite
// getAllAttendanceFromMonth
// getAttendanceFromWorker

export const saveAttendance = (attendanceData: IAttendance[]): AppThunk => {
  return () => {
    attendanceData.forEach((attendance) => {
      // insert attendance into data base
      dbStores.attendance.insert(attendance, (err: any, newDoc: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`[saveAttendance]: ${newDoc}`);
        }
      });
    });
  };
};

export const generateAttendanceDocs = (siteId?: number): AppThunk => {
  return (dispatch, getState) => {
    // const { sites } = getState();

    if (siteId === undefined) {
      // get site data
      // const site: ISite = sites.filter((s: ISite) => s.id === siteId)[0];
    } else {
      // get site with the oldest date
    }

    // get months fileanme for db documents generations
    // const months: string[] = countMonths(site.startdate, new Date()).fileNames;

    // generate attendance files: IPC -> emmit event to main process
    //   ipcRenderer.send(dbActions.CREATE_SINGLE_DOCUMENTS, months);
    //   ipcRenderer.on(
    //     dbActions.CREATE_SINGLE_DOCUMENTS_RESPONSE,
    //     (event, arg) => {
    //       console.log(
    //         `[DB]: Create Attendance documents: ${arg.response, arg.data}`
    //       );
    //     }
    //   );
  };
};

// export const generateAttendanceDataForWorker = (
//   relations: IRelation[]
// ): AppThunk => {
//   return (dispatch, getState) => {
//     relations.forEach(relation => {
//       // check if worker is still working in site

//       // find the latest attendance entry for (worker, site)

//       // if: no relations found -> generate relations from worker.startdate

//       // else: get the earliest entry date and check if it's upto date
//     });
//   };
// };

export default attendanceSlice.reducer;

export const selectAttendance = (state: RootState) => state.relations;

export const attendanceActions = _actions;
