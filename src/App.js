import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PageLayout from './components/PageLayout';
import PageLoader from './components/PageLoader';
import AuthContext from './context/Auth';

export default function App() {
  return (
    <AuthContext>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <PageLayout>
              <Route
                path="/user-account-connect"
                exact={true}
                component={lazy(() => import('./screens/userAccountConnect'))}
              />
              <Route
                path="/user-account"
                exact={true}
                component={lazy(() => import('./screens/UserAccount'))}
              />
              <Route
                path="/configuration"
                exact={true}
                component={lazy(() => import('./screens/configuration'))}
              />
              <Route
                path="/database"
                exact={true}
                component={lazy(() => import('./screens/Database'))}
              />
              <Route
                path="/add-database"
                exact={true}
                component={lazy(() => import('./screens/AddDatabase'))}
              />
              <Route
                path="/coin-details"
                exact={true}
                component={lazy(() => import('./screens/CoinDetails'))}
              />
              <Route
                path="/big-swap"
                exact={true}
                component={lazy(() => import('./screens/BigSwap'))}
              />
              <Route
                path="/pool-explorer"
                exact={true}
                component={lazy(() => import('./screens/PoolExplorer'))}
              />
              <Route
                path="/pair-explorer"
                exact={true}
                component={lazy(() => import('./screens/PairExplorer'))}
              />
              <Route
                path="/my-profile"
                exact={true}
                component={lazy(() => import('./screens/MyProfile'))}
              />
              <Route
                exact={true}
                path="/"
                component={lazy(() => import('./screens/home'))}
              />
            </PageLayout>
          </Switch>
        </Suspense>
      </Router>
    </AuthContext>
  );
}
