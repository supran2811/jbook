import produce, { Draft } from "immer";
import { Action } from "../actions";
import { ActionType } from "../actionTypes";

interface BUNDLE_STATE {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const INITIAL_STATE: BUNDLE_STATE = {};

const bundleReducer = produce((draft: Draft<BUNDLE_STATE>, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
      draft[action.payload.cellId] = {
        loading: true,
        code: "",
        error: "",
      };
      break;
    }
    case ActionType.BUNDLE_COMPLETED: {
      draft[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
      break;
    }
    default: {
      break;
    }
  }
}, INITIAL_STATE);

export default bundleReducer;
