// Interfaces

export interface IWorker {
  _id?: number;
  name: string;
  startdate: string;
  information: string;
  workertype: string;
  sites?: Array<ISite>;
}

export interface ISite {
  _id?: number;
  name: string;
  startdate: string;
  information: string;
  active: boolean;
  workers?: Array<IWorker>;
}
