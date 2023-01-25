import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import CompanyServices from "../../services/company/company-list";
import { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { snackActions } from "../snackbar";
import Skeleton from "@mui/material/Skeleton";

const sekletonDAta = [1, 2, 3, 4, 5, 6];
const columns = [
  { id: "code", label: "Code" },
  { id: "name", label: "Name" },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phone",
    label: "Phone",
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

function EnhancedTableToolbar(props) {
  const { numSelected, funcDelete, idCompany } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Companies
        </Typography>
      )}

      {numSelected === 1 ? (
        <>
          <Tooltip title="Delete" onClick={funcDelete}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" component={Link} to={`${idCompany}/edit/`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" component={Link} to={`${idCompany}`}>
            <IconButton>
              <PageviewIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : numSelected > 1 ? (
        <Tooltip title="Delete" onClick={funcDelete}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Company" component={Link} to="add">
          <Button size="large" variant="contained" endIcon={<AddBoxIcon />}>
            Add
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function StickyHeadTable() {
  const [companies, setCompanies] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [message, setMessage] = useState("");
  const [severityAlert, setSeverityAlert] = useState("");
  const services = new CompanyServices();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openSekleton, setOpenSekleton] = React.useState(false);
  const [depedency, setDepedency] = React.useState(0);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const deleteItem = async (id) => {
    setOpen(false);
    await services
      .deleteCompany(selected)
      .then((res) => {
        console.log(res);
        if (res === true) {
          console.log("Success to delete company data");
          setOpenAlert(true);
          setDepedency((plus) => plus + 1);
          setSeverityAlert("success");
          setMessage("Success to delete company data!");
          console.log(res);
        } else {
          setMessage("Failed to delete company data");
          setOpenAlert(true);
          setDepedency((plus) => plus - 1);
          setSeverityAlert("error");
          setMessage("Failed to delete company data!");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSelected([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItems = async () => {
    setOpen(false);
    for (let item of selected) {
      await services.deleteCompany(item).then((res) => {
        if (res === true) {
          console.log("Berhasil");
          setDepedency((plus) => plus + 1);
          snackActions.success("Success to delete company data");
        } else {
          console.log("gagal");
          setDepedency((plus) => plus - 1);
          snackActions.error("Failed to delete company data!");
        }
      });
    }
    setSelected([]);
    return;
  };

  useEffect(() => {
    setOpenSekleton(true);
    setTimeout(() => {
      services.getAllCompanies().then(
        (response) => {
          setOpenSekleton(false);
          setCompanies(response);
        },
        (error) => {
          setMessage(error);
        }
      );
    }, 500);
  }, [depedency]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = companies.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    // <Paper
    //   sx={{
    //     p: 2,
    //     display: "flex",
    //     flexDirection: "column",
    //     height: "100%",
    //   }}
    // >
    <Paper sx={{ p: 2, width: "100%", overflow: "hidden" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        funcDelete={handleClickOpen}
        idCompany={selected}
      />
      <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            rowCount={companies.length}
          />
          {openSekleton === true ? (
            <TableBody>
              {sekletonDAta.map((row) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={25} animation="wave" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              {companies
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": row.id,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete these items?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={selected.length > 1 ? deleteItems : deleteItem}
            autoFocus
          >
            Yes sure
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severityAlert}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
    // </Paper>
  );
}
