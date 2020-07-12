import { app, ipcMain } from 'electron';
import Datastore from 'nedb';
import dbActions from '../constants/dbActions.json';

let path =
  process.env.NODE_ENV === 'development' ? '.' : app.getPath('userData');

export const dbCreateLoad = (fileName: string) => {
  return new Datastore({
    filename: path.concat('/dbData/', fileName),
    timestampData: false,
    autoload: true,
  });
};

export const dbDocuments = {
  workers: dbCreateLoad('workers.db'),
  sites: dbCreateLoad('sites.db'),
  relations: dbCreateLoad('relations.db'),
  attendance: dbCreateLoad('attendance.db'),
};

export const dbListeners = () => {
  // create multiple attendance documents
  // ipcMain.on(
  //   dbActions.CREATE_MULTIPLE_DOCUMENTS,
  //   (event, filenames: string[]) => {
  //     if (filenames.length) {
  //       filenames.forEach((file: string) => {
  //         dbCreateLoad(`attendance/${file}`);
  //       });
  //       event.sender.send(dbActions.CREATE_MULTIPLE_DOCUMENTS_RESPONSE, {
  //         response: true,
  //         data: filenames,
  //       });
  //     }
  //   }
  // );
};
