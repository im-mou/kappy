// Interfaces

export interface IWorker {
  id: number;
  name: string;
  startdate: string;
  information: string;
  workertype: string;
  sites?: Array<ISite>;
}

export interface ISite {
  id: number;
  name: string;
  startdate: string;
  information: string;
  workers?: Array<IWorker>;
}
