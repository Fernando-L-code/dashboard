import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Table as MuiTable,
    Button,
    IconButton,
  } from "@mui/material";
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import React, { useState } from "react";
import moment from "moment";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

  

const CustomTable = ({ columns, data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatCreatedAt = (value) => {
    return moment.utc(value).format("D/MMMM/YYYY");
  };

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrderBy(columnId);
    setOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <Paper sx={{ width: "90%", margin: "auto" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                     { column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {columns.map((column) => {
                      const value =
                        column.id === "createdAt"
                          ? formatCreatedAt(row[column.id])
                          : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <div>
                              <IconButton color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </div>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;