export type CellsType = "code" | "text";
export interface Cell {
  type: CellsType;
  id: string;
  content: string;
}
