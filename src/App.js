import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import listCar from './pages/listCar';
import postCar from './pages/postCar';
import postTransaction from './pages/postTransaction';

import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acf0',
      contrastText: '#fff',
    },
  },
});
const App = ({ store }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/home" component={listCar} />
          <Route path="/add" component={postCar} />
          {/* <Route path="/update/:id" component={Detail} /> */}
          {/* <Route path="/delete/:id" component={Detail} /> */}
          <Route path="/transaction" component={postTransaction} />
          {/* <Redirect to="/add" /> */}
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>

)
// App.propTypes = {
//   store: PropTypes.object.isRequired
// }
export default App
