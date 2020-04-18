import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    Julieca
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/home" component={listCar} />
          <Route path="/add/:id?" component={postCar} />
          <Route path="/transaction" component={postTransaction} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>

)
export default App
