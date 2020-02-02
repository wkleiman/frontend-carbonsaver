import * as types from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_GROUPS:
      return { ...state, ..._.mapKeys(action.payload, "name") };
    default:
      return state;
  }
};
