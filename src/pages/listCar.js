import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import { getRentCar } from '../actions';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, FormControl, Button, Paper
} from '@material-ui/core';
import * as enums from "../enums";


function App(props) {
  useEffect(() => {
    props.getRentCar();
  }, []);
  return (
    <div className="App" >

      <div className="App-header">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <FormControl style={{ width: "100%" }}>
                  <Button variant="contained" onClick={() => { props.history.push('/add') }}>Add Car</Button>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl style={{ width: "100%" }}>
                  <Button variant="contained" onClick={() => { props.history.push('/transaction') }}>Book Now!</Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <div style={{ width: "100%" }}>
              <TableContainer component={Paper} >
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
                          <Button variant="contained" onClick={() => props.history.push('/add/' + p.id)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    )};
                </TableBody>
                </Table>
              </TableContainer>

            </div>
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