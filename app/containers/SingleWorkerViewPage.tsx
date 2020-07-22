import React, { useState, useEffect } from 'react';
import SingleWorkerView from '../features/workers/SingleWorkerView';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function WorkerViewPage() {
  const [title, setTitle] = useState('Loading...');
  let _title = title;

  const updateTitle = (value: string) => {
    _title = value;
  };

  useEffect(() => {
    setTitle(_title);
  }, [_title]);

  return (
    <>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}> */}
        <PageHeaderMenu title={title} subTitle="Información del trabajador" />
        <SingleWorkerView obtainTitle={updateTitle} />
      {/* </React.Suspense> */}
    </>
  );
}
