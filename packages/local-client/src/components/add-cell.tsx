import React from "react";
import { useActions } from "../hooks/use-actions";
import "./add-cell.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisibile?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisibile, prevCellId }) => {
  const { insertCellsAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisibile && "force-visible"}`}>
      <div className="divider" />
      <div className="add-cell-actions">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellsAfter(prevCellId, "code")}
        >
          <span>
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellsAfter(prevCellId, "text")}
        >
          <span>
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
    </div>
  );
};

export default AddCell;
