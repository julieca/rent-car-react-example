import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Link
} from "react-router-dom";

import moment from "moment";

import {
  Grid, FormControl, InputLabel, Select, MenuItem, ListItemText, Card, Button, Typography, CardContent, Snackbar, TextField
} from '@material-ui/core';

import PaperRent from "../component/paperRent";
import { getRentCar, postTransaction } from '../actions';

const PostTransaction = props => {

  const [rentSelect, setRentSelect] = React.useState([]);
  const [discount, setDiscount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [rentFrom, setRentFrom] = React.useState('');
  const [rentTo, setRentTo] = React.useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!props.data.cars) {
      props.getRentCar();
    }
  }, []);
  useEffect(() => {
    count();
  }, [rentSelect, rentFrom, rentTo]);

  const bookNow = () => {
    const tr = { rentFrom, rentTo, cars: rentSelect, total };
    props.postTransaction(tr);
    setOpen(true);
  }

  const count = () => {
    if (rentSelect && rentTo && rentFrom) {
      ///Extract Days
      let days = moment(rentTo).diff(moment(rentFrom), 'days') + 1;

      let bill = 0;
      let disc = 0;
      for (let i = 0; i < rentSelect.length; i++) {
        // let selected = rentSelect[i];
        const selected = props.data.cars.find(car => car.platNum === rentSelect[i]);

        let pri = (selected.price * days);

        //disc if each car has year lt 2010
        if (selected.year < 2010) {
          disc += pri * 7 / 100;
        }
        bill += pri;
      }

      //disc if rent 2 car
      if (rentSelect.length >= 2) {
        disc += bill * 10 / 100;
      }
      //disc if days more than 3 days
      if (days >= 3) {
        disc += bill * 5 / 100;
      }

      setPrice(bill);
      setDiscount(disc);
      setTotal(bill - disc);
    }

  }
  return (
    <div style={{ padding: "30px" }}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={9} md={6}>
          <Link to="/home">Back</Link>
          <FormControl style={{ width: "100%" }}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={6}>
                <TextField
                  type="date"
                  variant="outlined"
                  label="From"
                  value={rentFrom}
                  onChange={(e) => { setRentFrom(e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  variant="outlined"
                  label="To"
                  value={rentTo}
                  onChange={(e) => { setRentTo(e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

          </FormControl>
        </Grid>
        <Grid item xs={9} >
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="search" variant="outlined">Search</InputLabel>
            <Select
              multiple
              labelId="search"
              value={rentSelect}
              onChange={(e) => { setRentSelect(e.target.value) }}
              renderValue={(selected) => selected.join(', ')}
            >
              {
                props.data.cars && props.data.cars.map((p, i) =>
                  <MenuItem key={i} value={p.platNum}>
                    <ListItemText primary={p.platNum + " - " + p.year + " - " + p.passengerNum + " passengers - $" + p.price} />
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          {
            rentSelect && rentSelect.map((p, i) =>
              <PaperRent
                key={i}
                data={p}
                props={props.data.cars}
              />
            )
          }
        </Grid>
        <Grid item xs={10} >
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography >
                    Price = $ {price}
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography >
                    Discount = -$ {discount}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography >
                    Total = $ {total}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <Button variant="contained" onClick={(e) => { bookNow(e) }}>Save</Button>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
}
const mapDispatchToProps = dispatch => ({
  getRentCar: () => dispatch(getRentCar()),
  postTransaction: (tr) => dispatch(postTransaction(tr))
});
export default connect(mapStateToProps, mapDispatchToProps)(PostTransaction);
