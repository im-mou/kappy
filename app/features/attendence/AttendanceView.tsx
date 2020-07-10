import React from 'react';
import routes from '../../constants/routes.json';
import Lists from '../../components/Lists';
import { ISite } from '../../interfaces/interfaces';

import { Descriptions, Button, Space } from 'antd';
import { render } from 'enzyme';

type TSites = Array<ISite>;
const sitesList: TSites = [
  {
    siteId: 1,
    name: 'Obra 1',
    startdate: '10/03/2010',
    information: 'Jefe de obra: 94847463',
    active: true,
    workers: [
      {
        workerId: 1,
        name: 'Mohsin Riaz',
        startdate: '27/02/2020',
        information: 'telefono: 94847463',
        workertype: 'Encargado',
      },
      {
        workerId: 2,
        name: 'Aamir mumtaz',
        startdate: '20/05/2320',
        information: 'telefono: 948252463',
        workertype: 'Encargado',
      },
    ],
  },
  {
    siteId: 1,
    name: 'Obra 2',
    startdate: '10/03/2010',
    information: 'Jefe de obra: 94847463',
    active: true,
    workers: [
      {
        workerId: 1,
        name: 'Mohsin Riaz',
        startdate: '27/02/2020',
        information: 'telefono: 94847463',
        workertype: 'Encargado',
      },
    ],
  },
];

export default function AttendanceView(): JSX.Element {
  return <>dfgsdfg</>;
}

// export default const AttendanceView(): React.Component {
//   consstructor(){
//     super()

//   }

//   render()
//   {return (
//     <div className="section">
//       <p className="section-header">Libro de Assistencia</p>
//       <Button type="primary">Ver Assistencia</Button>

//       <p className="section-header">Opciones</p>
//       <Space>
//         <Button type="dashed">Guardar</Button>
//       </Space>
//     </div>
//   )};
// }
