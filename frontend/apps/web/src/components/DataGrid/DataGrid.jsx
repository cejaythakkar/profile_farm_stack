import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import GridStyle from './gridStyles';

const DataGrid = ({ data, columns, rowIdentifier = 'id' }) => {
  return (
    <MuiDataGrid
      rows={data}
      columns={columns}
      pageSizeOptions={[5]}
      rowHeight={70}
      getRowId={(row) => row[rowIdentifier]}
      rowSelection={false}
      disableColumnSorting={true}
      disableColumnFilter={true}
      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 5, // 👈 This will force it to split 7 rows into 2 pages
          },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
      sx={GridStyle}
      onCellKeyDown={(params, event) => {
        const isInput =
          event.target.tagName === 'INPUT' ||
          event.target.tagName === 'TEXTAREA';
        if (isInput) {
          event.stopPropagation();
          event.defaultMuiPrevented = true;
        }
      }}
    />
  );
};

export default DataGrid;
