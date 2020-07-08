import { app } from 'electron';
import Datastore from 'nedb-promises';

let path =
  process.env.NODE_ENV === 'development' ? '.' : app.getPath('userData');

const dbCreateLoad = (fileName: string) => {
  return Datastore.create({
    filename: path.concat('/dbData/', fileName),
    timestampData: true,
    autoload: true,
  });
};

export const dbDocuments = {
  workers: dbCreateLoad('workers.db'),
  sites: dbCreateLoad('sites.db'),
  attendance: dbCreateLoad('attendance.db'),
};
