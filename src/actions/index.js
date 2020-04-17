import $axios from '../config/axiosInstance';
import * as url from '../enums/url';
import {
  GET_CAR, POST_CAR
} from '../enums/mutations';

export const getRentCar = () => {
  return async dispatch => {
    // const { data } = (await $axios.get(url.getRentCar)).data[0];
    const data = [{
      id: 1,
      platNum: "J457OS",
      type: "sedan",
      passengerNum: 5,
      year: 1232,
      merk: "niko",
      color: "green",
      price: 70
    }, {
      id: 2,
      platNum: "F645JD",
      type: "truck",
      passengerNum: 12,
      year: 2010,
      merk: "nadin",
      color: "blue",
      price: 200
    }, {
      id: 3,
      platNum: "B677AS",
      type: "sedan",
      passengerNum: 51,
      year: 2423,
      merk: "honda",
      color: "red blaze",
      price: 4500
    }];
    dispatch({
      type: GET_CAR,
      payload: data
    })
  }
}

export const postRentCar = (car) => {
  return async dispatch => {
    // car : platNum,passenger,merk,year,color,price
    // const { data } = (await $axios.post(url.postRentCar, )).data[0];
    const data = car;


    dispatch({
      type: POST_CAR,
      payload: data
    })
  }
}

// export const updateRentCar = (car) => {
//   return async dispatch => {

//     const { data } = (await $axios.post(url.postRentCar)).data[0];
//     dispatch({
//       type: UPDATE_CAR,
//       payload: data
//     })
//   }
// }

// postTransaction(rentFrom, rentTo, cars, total);