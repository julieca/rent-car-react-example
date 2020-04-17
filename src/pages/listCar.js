import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useParams, useHistory
} from "react-router-dom";

import { getRentCar } from '../actions';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, OutlinedInput, InputAdornment, BottomNavigation,
  BottomNavigationAction, Paper, Typography
} from '@material-ui/core';
import color from '@material-ui/core/colors/amber';
// import { Home, Favorite, ShoppingCart, History, Search } from '@material-ui/icons';
// import "../assets/css/Home.css";

// const navigation = { Home, Favorite, ShoppingCart, History };
// console.log(navigation)

import * as enums from "../enums";


function App(props) {
  // let history = useHistory();
  // const { token } = useParams();
  // const [nav, setNav] = React.useState(0);
  useEffect(() => {
    props.getRentCar();
  }, []);
  console.log(props)
  return (
    <div className="App">

      <div className="App-header">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={10} md={6}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    {Object.keys(enums.carLabel).map((i) =>
                      <TableCell align="right" key={i}>{enums.carLabel[i]}</TableCell>
                    )}
                    <TableCell align="right"> Action </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                  {props.data.cars && props.data.cars.map((p, i) =>
                    <TableRow key={i}>
                      <TableCell >{i + 1}</TableCell>
                      {
                        Object.keys(enums.carLabel).map(t =>
                          <TableCell align="right" key={t}>{p[t]}</TableCell>
                        )
                      }
                      <TableCell align="right">
                        <Typography
                        // onClick={() => history("/add?params=" + p.id)}
                        >
                          Edit
                      </Typography>

                      </TableCell>
                    </TableRow>
                  )};
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = ({ data }) => {
  return { data }
};
const mapDispatchToProps = dispatch => ({
  getRentCar: () => dispatch(getRentCar())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
