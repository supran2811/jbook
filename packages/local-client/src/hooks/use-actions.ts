import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import { useMemo } from "react";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
