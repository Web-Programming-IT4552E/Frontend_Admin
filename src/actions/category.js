import { Actions } from "src/configs";
import axios from "axios";

require("dotenv").config();

export const getCategoryThunk = () => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_API}category/categories`)
    .then((res) => {
      dispatch({
        type: Actions.GET_CATEGORY_SUCCESS,
        payload: {
          category_list: res.data,
        },
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: Actions.GET_CATEGORY_FAIL,
          payload: {
            message: "get category failed!",
          },
        });
      }
    });
};
