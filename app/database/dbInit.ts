import { app } from 'electron';
import Datastore from 'nedb';
import { resolve } from 'dns';

let path =
  process.env.NODE_ENV === 'development' ? '.' : app.getPath('userData');

const dbCreateLoad = (fileName: string) => {
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
};
