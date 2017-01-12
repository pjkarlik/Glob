import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Home from './containers/Home';
/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
export function prefetchRoutes() {
  require.ensure([
    './containers/Example'], () => {});
    // ,'./containers/Example' //
}

export default (
  <Route path = "/" component = {App}>
    <IndexRoute component = {Home} />
    <Route path = "dance" getComponent={(location, cb) =>
      require.ensure(['./containers/Example'], (require) => {
        cb(null, require('./containers/Example').default);
      })
    }
    />
  </Route>
);
