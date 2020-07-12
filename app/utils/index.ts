import { remote } from 'electron';
import moment, { MomentInputObject } from 'moment';

export const db = remote.getGlobal('dbCreateLoad');
export const dbStores = remote.getGlobal('dbDocuments');

export const countMonths = (startDate: any, endDate: any) => {
  const _startDate = moment(startDate, 'MM/YYYY');
  const _endDate = moment(endDate, 'MM/YYYY');
  var monthsValues = [];
  var fileNames = [];

  while (
    _endDate > _startDate ||
    _startDate.format('M') === _endDate.format('M')
  ) {
    monthsValues.push(_startDate.format('MM/YYYY'));
    fileNames.push('attendance.'.concat(_startDate.format('MM.YYYY')));
    _startDate.add(1, 'month');
  }

  // const diffInMonths = Math.floor(_endDate.diff(_startDate, 'months', true));

  return { monthsValues, fileNames };
};
