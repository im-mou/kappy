import React, { useState, useEffect } from 'react';
import SingleSiteView from '../features/sites/SingleSiteView';
import PageHeaderMenu from '../features/layout/PageHeaderMenu';

export default function SiteViewPage() {
  const [title, setTitle] = useState('Loading...');
  let _title = title;

  const updateTitle = (value: string) => {
    _title = value;
  };

  useEffect(() => {
    setTitle(_title);
  }, []);

  return (
    <>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}> */}
        <PageHeaderMenu title={title} subTitle="Información de la empresa" />
        <SingleSiteView obtainTitle={updateTitle} />
      {/* </React.Suspense> */}
    </>
  );
}
