import { Actions } from "src/configs";

const initialState = [];
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CATEGORY_SUCCESS:
      return action.payload.category_list;
    default:
      return state;
  }
};

export default categoryReducer;
