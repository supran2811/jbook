import "./cell-list.css";
import React, { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <div className="cell-list">
      <AddCell forceVisibile={cells.length === 0} prevCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell prevCellId={cell.id} />
          <CellListItem cell={cell} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
