import produce, { Draft } from "immer";

import { Action } from "../actions";
import { ActionType } from "../actionTypes";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((draft: Draft<CellsState>, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_CELL_LOADING: {
      draft.loading = true;
      draft.error = null;
      break;
    }
    case ActionType.FETCH_CELL_COMPLETED: {
      draft.order = action.payload.map(({ id }) => id);
      draft.loading = false;
      draft.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);
      break;
    }
    case ActionType.FETCH_CELL_ERROR: {
      draft.error = action.payload;
      draft.loading = false;
      break;
    }
    case ActionType.SAVE_CELL_ERROR: {
      draft.error = action.payload;
      break;
    }
    case ActionType.MOVE_CELL:
      const currentIndex = draft.order.findIndex(
        (id) => id === action.payload.id
      );
      const targetIndex =
        action.payload.direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (!(targetIndex < 0 || targetIndex > draft.order.length - 1)) {
        draft.order[currentIndex] = draft.order[targetIndex];
        draft.order[targetIndex] = action.payload.id;
      }
      break;
    case ActionType.DELETE_CELL:
      delete draft.data[action.payload];
      draft.order = draft.order.filter((id) => id !== action.payload);
      break;
    case ActionType.UPDATE_CELL:
      draft.data[action.payload.id].content = action.payload.content;
      break;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        id: getId(),
        content: "",
        type: action.payload.type,
      };

      draft.data[cell.id] = cell;

      // if (action.payload.id) {
      //   const index = draft.order.findIndex((id) => id === action.payload.id);
      //   draft.order.splice(index, 0, cell.id);
      // } else {
      //   draft.order.push(cell.id);
      // }
      const index = draft.order.findIndex((id) => id === action.payload.id);

      if (index < 0) {
        draft.order.unshift(cell.id);
      } else {
        draft.order.splice(index + 1, 0, cell.id);
      }
      break;
    default:
      break;
  }
}, initialState);

const getId = () => Math.random().toString(36).substr(2, 5);

export default reducer;
