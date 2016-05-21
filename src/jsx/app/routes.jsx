import { Route, Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory from 'react-router/lib/HashHistory';
import Blank from 'routes/setup-alert';
import HIW from 'routes/how-it-works';
import MYALERTS from 'routes/myalerts';
import Login from 'routes/login';
import Signup from 'routes/signup';

export default (withHistory, onUpdate) => {
  const history = withHistory?
                  (Modernizr.history ?
                    new BrowserHistory
                  : new HashHistory)
                : null;
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Blank} />
      <Route path='/how-it-works' component={HIW} />
      <Route path='/my-alerts' component={MYALERTS} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Router>
  );
};
