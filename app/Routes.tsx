/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SitesPage from './containers/SitesPage';
import WorkersPage from './containers/WorkersPage';
import NewSitePage from './containers/NewSitePage';
import NewWorkerPage from './containers/NewWorkerPage';
import SingleWorkerViewPage from './containers/SingleWorkerViewPage';
import SingleSiteViewPage from './containers/SingleSiteViewPage';

// Lazily load routes and code split with webpacck
// const LazyNewSitePage = React.lazy(() => import('./containers/NewSitePage'));

// const NewSitePage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyNewSitePage {...props} />
//   </React.Suspense>
// );

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.SITE} component={SingleSiteViewPage} />
        <Route path={routes.WORKER} component={SingleWorkerViewPage} />
        <Route path={routes.NEWWORKER} component={NewWorkerPage} />
        <Route path={routes.NEWSITE} component={NewSitePage} />
        <Route path={routes.WORKERS} component={WorkersPage} />
        <Route path={routes.SITES} component={SitesPage} />
        <Route exact path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
