import React from "react";
import "./cell-list-item.css";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import { Cell } from "../state";
import ActionBar from "./action-bar";

interface CellItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      {cell.type === "code" ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
