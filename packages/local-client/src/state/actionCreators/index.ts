import { Dispatch } from "react";
import axios from "axios";
import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  Direction,
  Action,
} from "../actions";
import { ActionType } from "../actionTypes";
import { Cell, CellsType } from "../cell";
import bundler from "../../bundler";
import { RootState } from "../reducers";

export const moveCells = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellsAfter = (
  id: string | null,
  type: CellsType
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETED,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELL_LOADING });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: ActionType.FETCH_CELL_COMPLETED, payload: data });
    } catch (err) {
      dispatch({ type: ActionType.FETCH_CELL_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { order, data },
    } = getState();

    const cells = order.map((id) => data[id]);
    console.log("Saving cells ", cells);
    try {
      await axios.post("/cells", cells);
    } catch (err) {
      dispatch({ type: ActionType.SAVE_CELL_ERROR, payload: err.message });
    }
  };
};
