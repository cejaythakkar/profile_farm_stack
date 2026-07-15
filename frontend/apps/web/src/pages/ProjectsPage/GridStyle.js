export default {
    border: 'none',
    backgroundColor: '#111827', // Main grid background
    color: '#c9d1d9',           // Row text color

    // 1. Force the entire top container block to be black
    '& .MuiDataGrid-topContainer': {
        backgroundColor: '#111827 !important',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#111827 !important',
        borderBottom: '1px solid #30363d',
    },

    // Header Column text styling
    '& .MuiDataGrid-columnHeaderTitle': {
        color: '#8b949e',
        fontWeight: '600',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
    },

    // Remove default hover styles on the black header
    '& .MuiDataGrid-columnHeader:hover': {
        backgroundColor: '#6B7280 !important',
    },

    '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#111827 !important',
    },

    // 2. Data Row Styling
    '& .MuiDataGrid-row': {
       
        borderBottom: '1px solid #21262d',
        backgroundColor: '#111827',
        '&:hover': {
            backgroundColor: '#6B7280', // Subtle hover tint for records
        },
    },
    '& .MuiDataGrid-cell': {
        fontSize: '0.875rem',
        borderBottom: 'none',
        
    },

    // 3. Pagination Footer Styling
    '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#111827',
        borderTop: '1px solid #30363d',
        color: '#c9d1d9',
    },
    '& .MuiDataGrid-columnHeaders .MuiDataGrid-filler': {
        backgroundColor: '#111827',
    },
    '& .MuiTablePagination-root': {
        color: '#c9d1d9',
    },
    '& .MuiTablePaginationActions-root .Mui-disabled': { color: '#c9d1d9 !important', },
    '& .MuiTablePaginationActions-root':{color: '#c9d1d9 !important',},
    '& .MuiIconButton-root': {
        color: '#c9d1d9',
    },
}