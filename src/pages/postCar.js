import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useParams, Link
} from "react-router-dom";
import {
  Grid, Button, TextField, Snackbar
} from '@material-ui/core';

import {
  getRentCar,
  postRentCar,
  updateRentCar
} from "../actions";
import * as enums from "../enums";

function PostCar(props) {

  const idCar = (useParams()).id;
  const [car, setCar] = React.useState({
    platNum: "",
    type: "",
    merk: "",
    color: "",
    price: "",
    passengerNum: "",
    year: "",
  });
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    if (!props.data.cars || props.data.cars === undefined) {
      props.getRentCar();
    }
  }, []);
  useEffect(() => {
    if (idCar && props.data.cars) {
      const selected = props.data.cars.find(p => p.id === idCar);
      if (selected) {
        setCar(selected);
      }
    }
  }, [props.data.cars]);

  const posting = () => {
    setOpen(true);
    if (idCar) {
      props.updateRentCar(car);
    } else {
      props.postRentCar(car);
    }
  };

  const change = (k, v) => {
    setCar(c => { c[k] = v; return { ...c }; });
  }



  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={9} md={6}>
          <Link to="/home">Back</Link>

          <Grid container justify="center">
            <Grid item>
              <h3>Add Rent Car : </h3>
              <div>
                {Object.keys(enums.carLabel).map(i =>
                  <TextField key={i} label={enums.carLabel[i]} variant="outlined"
                    value={car[i]}
                    onChange={(e) => change(i, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                )
                }


              </div>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={(e) => { posting(e) }}>Save</Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        message="Success"
      />
    </div>
  );
}
const mapStateToProps = ({ data }) => {
  return { data }
};

const mapDispatchToProps = dispatch => ({
  getRentCar: () => dispatch(getRentCar()),
  postRentCar: (car) => dispatch(postRentCar(car)),
  updateRentCar: (car) => dispatch(updateRentCar(car)),

});
export default connect(mapStateToProps, mapDispatchToProps)(PostCar);
