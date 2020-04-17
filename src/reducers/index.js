import {
  combineReducers
} from 'redux'
import {
  GET_CAR
} from '../enums/mutations'

function data(state = {}, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_CAR:
      state = { cars: payload }
      return state;
    default:
      return state
  }
}
const rootReducer = combineReducers({
  data
})
export default rootReducer
