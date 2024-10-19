import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const customStyles = {
    table: {
        style: {
            overflowX: 'auto',
        },
    },
    head: {
        style: {
            fontSize: "13px",
            fontWeight: "bold",
            height: '60px',
        },
    },
    rows: {
        style: {
            minHeight: '65px',
            cursor: 'pointer'
        },
    },
    headCells: {
        style: {
            paddingRight: '5px',
            backgroundColor: '#444',
            color: '#fff',
            height: '60px'
        },
    },
    cells: {
        style: {
            textAlign: 'center'
        }
    }
};


function TableUI({ columns, data, toLink, emptyComponent, selectableRows, loading }) {
    const navigate = useNavigate();

    return (
        <>
            {(data && data?.length > 0) ? (
                <DataTable
                    data={data}
                    columns={columns}
                    pointerOnHover
                    highlightOnHover
                    persistTableHead
                    noDataComponent={false}
                    customStyles={customStyles}
                    selectableRows={selectableRows}
                    // onRowClicked={(row) => navigate(`${toLink}/${row.id}`)}
                />
            ) : (
                <>
                    {emptyComponent}
                </>
            )}

        </>
    )
}

export default TableUI