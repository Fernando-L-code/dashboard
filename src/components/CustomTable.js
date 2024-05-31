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
  

const CustomTable = ({ columns, data, filtro, count, setFiltro }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const newOffset = newPage * rowsPerPage;
  
    // Actualiza el offset en el filtro sin cambiar la página
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      offset: newOffset
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    // Simulando el cambio de página restableciendo el offset a 0
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      limit: newRowsPerPage,
      offset: 0,
    }));
  
  };

  const formatCreatedAt = (value) => {
    return moment.utc(value).format("D/MMMM/YYYY");
  };


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
            {data
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
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;