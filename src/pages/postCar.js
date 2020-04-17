import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useParams, useHistory
} from "react-router-dom";
import {
  Grid, IconButton, Button, FormGroup,
  FormControlLabel,
  Checkbox, TextField, Snackbar
} from '@material-ui/core';

import {
  postRentCar,
  // updateRentCar
} from "../actions";
import * as enums from "../enums";

function PostCar(props) {

  const idCar = React.useParams();

  const [car, setCar] = React.useState({});
  const [open, setOpen] = React.useState(false);

  // const history = useHistory();

  // const goToHome = () => {
  //   history.push("/home")
  // }

  // useEffect(() => {
  //   if (!props.data.rentCar) {
  //     props.getRentCar();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (idCar) {
  //     const selected = props.data.rentCar.find(p => p.id == idCar);
  // if (selected) {
  //   setCar(selected);
  // }
  //   }
  // });

  const posting = () => {
    console.log(car)
    setOpen(true);
    // if (idCar) {
    //   props.updateRentCar(car);
    // } else {
    //   props.postRentCar(car);
    // }
  };

  const change = (k, v) => {
    setCar(c => { c[k] = v; return c; });
  }



  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={9} md={6}>
          <Grid container justify="center">
            <Grid item>
              <h3>Add Rent Car : </h3>
              <div>
                {Object.keys(enums.carLabel).map(i =>
                  <TextField label={enums.carLabel[i]} variant="outlined"
                    value={car[i]} onChange={(e) => change(i, e.target.value)}
                  />
                )
                }

                <Button variant="contained" onClick={(e) => { posting(e) }}>Save</Button>
              </div>
            </Grid>
          </Grid>
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
// const mapStateToProps = ({ data }) => {
//   return { data }
// };

const mapDispatchToProps = dispatch => ({
  // getRentCar: () => dispatch(getRentCar()),
  postRentCar: (car) => dispatch(postRentCar(car)),
  // updateRentCar: (car) => dispatch(updateRentCar(car)),

});
export default connect(null, mapDispatchToProps)(PostCar);
