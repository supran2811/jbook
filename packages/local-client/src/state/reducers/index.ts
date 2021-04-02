import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundleReducer from "./bundleReducer";

const reducer = combineReducers({
  cells: cellsReducer,
  bundle: bundleReducer,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
