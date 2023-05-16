import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Match from "../../interfaces/match";

interface TableData extends Match {
  id: number;
}

interface Props {
  columns: GridColDef[];
  rows: TableData[];
}

const MatchTable = ({columns, rows}: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter
      sx={{color: 'white'}}
    />
  );
};

export default MatchTable;