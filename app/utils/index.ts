import { remote } from 'electron';

export const dbStores = remote.getGlobal('dbDocuments');
