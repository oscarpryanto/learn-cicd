import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import SupplierServices from "../../services/supplier/supplier.service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, Link } from "react-router-dom";
import { snackActions } from "../snackbar";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AddressServices from "../../services/master.address";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { border } from "@mui/system";

export default function MediaCard() {
  const services = new SupplierServices();
  const addressServices = new AddressServices();
  const [open, setOpen] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCountry, setDataCountry] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataRegency, setDataRegency] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataVillage, setDataVillages] = useState([]);
  const [values, setInputValue] = useState({
    code: "",
    name: "",
    address: "",
    countryId: null,
    provinceId: null,
    regencyId: null,
    districtId: null,
    villageId: null,
    postalCode: null,
    email: "",
    phone: null,
    kusuka: false,
    taxNumber: null,
    nib: null,
    siup: null,
    logo: null,
  });

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      services
        .getSuppliersById(id)
        .then((supplierData) => {
          if (supplierData) {
            setOpenBackdrop(false);
            console.log(supplierData);
            setInputValue({
              code: supplierData.code,
              name: supplierData.name,
              address: supplierData.address,
              countryId: supplierData.countryId,
              provinceId: supplierData.provinceId,
              regencyId: supplierData.regencyId,
              districtId: supplierData.districtId,
              villageId: supplierData.villageId,
              postalCode: supplierData.postalCode,
              email: supplierData.email,
              phone: supplierData.phone,
              kusuka: supplierData.kusuka,
              taxNumber: supplierData.taxNumber,
              nib: supplierData.nib,
              siup: supplierData.siup,
              logo: supplierData.logo,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setOpenBackdrop(false);
        });
    }, 100);
  }, []);

  const deletes = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getAllAdress = async () => {
      if (values.countryId !== null) {
        await addressServices.getCountries().then(
          (response) => {
            setDataCountry(response);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("kosong");
      }

      if (values.provinceId !== null) {
        await addressServices.selectedProvinces(values.provinceId).then(
          (response) => {
            setDataProvince(response);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setDataProvince([]);
        console.log("kosong");
      }

      if (values.regencyId !== null) {
        await addressServices.selectedRegencies(values.regencyId).then(
          (response) => {
            setDataRegency(response);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setDataRegency([]);
        console.log("kosong");
      }

      if (values.districtId !== null) {
        await addressServices.selectedDistricts(values.districtId).then(
          (response) => {
            setDataDistrict(response);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setDataDistrict([]);
        console.log("kosong");
      }

      if (values.villageId !== null) {
        await addressServices.selectedVillage(values.villageId).then(
          (response) => {
            setDataVillages(response);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setDataVillages([]);
        console.log("kosong");
      }
    };
    getAllAdress();
  }, [
    values.countryId,
    values.provinceId,
    values.regencyId,
    values.districtId,
    values.villageId,
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = async () => {
    setOpen(false);
    await services
      .deleteSuppliers(id)
      .then((res) => {
        console.log(res);
        if (res === true) {
          snackActions.success("Success to delete Supplier data");
          console.log(res);
        } else {
          snackActions.error("Failed to delete Supplier data");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      navigate("/supplier");
    }, 100);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <div
            style={{
              paddingTop: 20,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 5,
              backgroundColor: "skyblue",
              width: 350,
              flexDirection: "column",
              gap: 5,

              //   backgroundImage:
              //     "url(https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg)",
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
            }}>
            <Avatar
              src="/broken-image.jpg"
              sx={{
                width: 200,
                height: 200,
              }}
            />
            <Typography gutterBottom variant="h6" component="div">
              {values.name}
            </Typography>
            <Grid container direction="row" sx={{ mt: -2 }}>
              <Grid
                item
                xs={6}
                container
                justifyContent="flex-end"
                alignItems="flex-end">
                <IconButton
                  color="error"
                  aria-label="Delete Company"
                  component="label"
                  onClick={deletes}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={6}
                container
                justifyContent="flex-start"
                alignItems="center">
                <IconButton
                  component={Link}
                  to={`/supplier/${id}/edit/`}
                  color="primary"
                  aria-label="Edit Company">
                  <BorderColorRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
          <Grid
            sx={{ flexGrow: 1, p: 4 }}
            container
            spacing={2}
            direction="column">
            <CardContent sx={{ pl: 3 }}>
              {/* <Typography gutterBottom variant="h5" component="div">
                {values.name}
              </Typography> */}
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Supplier Name
                      </TableCell>
                      <TableCell align="left">
                        {values.name !== null ? values.name : `-`}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Supplier code
                      </TableCell>
                      <TableCell align="left">
                        {values.code !== null ? values.code : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Address
                      </TableCell>
                      <TableCell align="left">
                        {values.address !== null
                          ? `Address : ${values.address} (${values.postalCode})`
                          : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Email
                      </TableCell>
                      <TableCell align="left">
                        {values.email !== null ? values.email : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Phone
                      </TableCell>
                      <TableCell align="left">
                        {values.phone !== null ? values.phone : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Tax Number
                      </TableCell>
                      <TableCell align="left">
                        {values.taxNumber !== null ? values.taxNumber : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Nomor Izin Berusaha
                      </TableCell>
                      <TableCell align="left">
                        {values.nib !== null ? values.nib : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Nomor Izin Usaha Perdagangan
                      </TableCell>
                      <TableCell align="left">
                        {values.siup !== null ? values.siup : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Kusuka
                      </TableCell>
                      {values.kusuka === true ? (
                        <TableCell align="left">Ada</TableCell>
                      ) : (
                        <TableCell align="left">Tidak ada</TableCell>
                      )}
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Country
                      </TableCell>
                      <TableCell align="left">Indonesia</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Province
                      </TableCell>
                      <TableCell align="left">
                        {values.provinceId !== null ? dataRegency.name : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        Regency
                      </TableCell>
                      <TableCell align="left">
                        {values.regencyId !== null ? dataRegency.name : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="left" component="th" scope="row">
                        District
                      </TableCell>
                      <TableCell align="left">
                        {values.districtId !== null ? dataDistrict.name : `-`}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left" component="th" scope="row">
                        Village
                      </TableCell>
                      <TableCell align="left">
                        {values.villageId !== null ? dataVillage.name : `-`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>

            <CardActions>
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-start"
                sx={{ pl: 3 }}>
                <Button size="small" component={Link} to={`/supplier/`}>
                  Back
                </Button>
              </Grid>
            </CardActions>
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete these items?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteItem} autoFocus>
                Yes sure
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          // onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}
