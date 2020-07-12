// Interfaces

export interface IWorker {
  id: number;
  name: string;
  startdate: string;
  information: string;
  workertype: string;
  _id?: string; // db record ID
}

export interface ISite {
  id: number;
  name: string;
  startdate: string;
  information: string;
  active: boolean;
  _id?: string; // db record ID
}

export interface IRelation {
  _id?: string; // db record ID
  workerId: number;
  siteId: number;
  startdate?: string;
  enddate?: string;
}

export interface IAttendance {
  _id?: string; // db record ID
  date: string,
  workerId: number;
  siteId: number;
  hours: number;
  absent: boolean;
}
