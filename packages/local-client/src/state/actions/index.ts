import { ActionType } from "../actionTypes";
import { Cell, CellsType } from "../cell";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellsType;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompletedAction {
  type: ActionType.BUNDLE_COMPLETED;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellLoading {
  type: ActionType.FETCH_CELL_LOADING;
}

export interface FetchCellError {
  type: ActionType.FETCH_CELL_ERROR;
  payload: string;
}

export interface FetchCellCompleted {
  type: ActionType.FETCH_CELL_COMPLETED;
  payload: Cell[];
}

export interface SaveCellError {
  type: ActionType.SAVE_CELL_ERROR;
  payload: string;
}
export type Action =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | BundleStartAction
  | BundleCompletedAction
  | FetchCellLoading
  | FetchCellCompleted
  | FetchCellError
  | SaveCellError;

export type Direction = "up" | "down";
