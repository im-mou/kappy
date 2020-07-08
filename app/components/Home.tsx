import React from 'react';
import { remote } from "electron";
import { IWorker } from '../interfaces/interfaces';
import AttendanceView from '../features/attendence/AttendanceView';

const dbDocuments = remote.getGlobal('dbDocuments');

const worker: IWorker = {
  name: 'mohsin riaz',
  startdate: '23/34/2092',
  information: 'jhsdfj jh fjhsd f',
  workertype: 'Oficial',
  sites: [],
};

const createWorker = async (worker: IWorker) => {
  const _worker = await dbDocuments.workers.insert(worker);
  return _worker;
};

console.table(createWorker(worker));

export default function Home(): JSX.Element {
  return <AttendanceView />;
}
