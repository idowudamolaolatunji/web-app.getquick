import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import CheckBoxInput from './CheckBoxInput';
import DefaultButton from './button/DefaultButton';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ProductCard from './ProductCard';

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
            height: '65px',
        },
    },
    rows: {
        style: {
            minHeight: '75px',
            cursor: 'pointer'
        },
    },
    headCells: {
        style: {
            paddingRight: '5px',
            backgroundColor: '#444',
            color: '#fff',
            height: '65px'
        },
    },
    cells: {
        style: {
            textAlign: 'center'
        }
    }
};


function TableUI({ columns, data, toLink, emptyComponent, selectableRows, headTabs, displayType = "table" }) {
    const isData = data?.length > 0;
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const [selectedRowsId, setSelectedRowsId] = useState([]);

    const handleSelectedRow = function ({ allSelected, selectedCount, selectedRows }) {
        const ids = [];
        selectedRows?.map(row => ids.push(row._id));
        setSelectedRowsId(ids);
    }

    return (
        <>
            {(isData) ? (
                <>
                    <div className='table--head'>
                        {selectedRowsId.length > 0 ? (
                            <span className='flex'>
                                <p>Selected: {selectedRowsId.length}</p>
                                <button className='table--btn'>delete <RiDeleteBin5Line /></button>
                            </span>
                        ) : (
                            <>{headTabs}</>
                        )}

                    </div>

                    {displayType == "grid" ? (
                        <div className='product__grid'>
                            {data.map(data => (
                                <ProductCard product={data} />
                            ))}
                        </div>
                    ) : (
                        <DataTable
                            data={data}
                            columns={columns}
                            pointerOnHover
                            highlightOnHover={width > 600 ? true : false}
                            persistTableHead
                            noDataComponent={false}
                            customStyles={customStyles}
                            selectableRows={selectableRows}
                            onSelectedRowsChange={handleSelectedRow}
                            pagination
                            onRowClicked={(row) => navigate(`${toLink}/${row._id}`)}
                        />
                    )}
                </>
            ) : (
                <>
                    {emptyComponent}
                </>
            )}

        </>
    )
}

export default TableUI