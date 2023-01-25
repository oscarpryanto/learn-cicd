import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import CompanyService from "../../services/company/company-list";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceTwoToneIcon from "@mui/icons-material/KeyboardBackspaceTwoTone";
import { snackActions } from "../snackbar";
import { useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddressServices from "../../services/master.address";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const bck = blueGrey[100];

export default function AddCompany() {
  const [inputValues, setInputValue] = useState({
    code: "",
    name: "",
    address: "",
    email: "",
    phone: null,
    postalCode: null,
    taxNumber: null,
    kusuka: false,
    logo: "",
    countryId: null,
    provinceId: null,
    regencyId: null,
    districtId: null,
    villageId: null,
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { id } = useParams();
  const [dataCountry, setDataCountry] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataRegency, setDataRegency] = useState([]);
  const [dataDistrict, setDataDistricts] = useState([]);
  const [dataVilage, setDataVillages] = useState([]);
  const [valueDisabled, setValueDisabled] = useState({
    provinceV: true,
    regencyV: true,
    districtV: true,
    villageV: true,
  });

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      services
        .getCompanyById(id)
        .then((companyData) => {
          if (companyData) {
            setOpenBackdrop(false);
            console.log(companyData);
            setInputValue({
              code: companyData.code,
              name: companyData.name,
              address: companyData.address,
              lastName: companyData.lastName,
              email: companyData.email,
              phone: companyData.phone,
              postalCode: companyData.postalCode,
              taxNumber: companyData.taxNumber,
              kusuka: companyData.kusuka,
              countryId: companyData.countryId,
              provinceId: companyData.provinceId,
              regencyId: companyData.regencyId,
              districtId: companyData.districtId,
              villageId: companyData.villageId,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setOpenBackdrop(false);
        });
    }, 100);
  }, []);

  useEffect(() => {
    if (inputValues.countryId !== null) {
      addressServices.getCountries().then(
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

    if (inputValues.provinceId !== null) {
      addressServices.getProvinces(inputValues.countryId).then(
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

    if (inputValues.regencyId !== null) {
      addressServices.getRegencies(inputValues.provinceId).then(
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

    if (inputValues.districtId !== null) {
      addressServices.getDistricts(inputValues.regencyId).then(
        (response) => {
          setDataDistricts(response);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setDataDistricts([]);
      console.log("kosong");
    }

    if (inputValues.villageId !== null) {
      addressServices.getVillage(inputValues.districtId).then(
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
  }, [
    inputValues.countryId,
    inputValues.provinceId,
    inputValues.regencyId,
    inputValues.districtId,
    inputValues.villageId,
  ]);

  const handleCountry = () => {
    addressServices.getCountries().then(
      (response) => {
        setDataCountry(response);
        setValueDisabled({ ...valueDisabled, provinceV: false });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleProvince = () => {
    addressServices.getProvinces(inputValues.countryId).then(
      (response) => {
        setDataProvince(response);
        setValueDisabled({ ...valueDisabled, regencyV: false });
        setDataRegency([]);
        setDataDistricts([]);
        setDataVillages([]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleRegency = () => {
    addressServices.getRegencies(inputValues.provinceId).then(
      (response) => {
        setDataRegency(response);
        setValueDisabled({ ...valueDisabled, districtV: false });
        setDataDistricts([]);
        setDataVillages([]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleDistrict = () => {
    addressServices.getDistricts(inputValues.regencyId).then(
      (response) => {
        setDataDistricts(response);
        setValueDisabled({ ...valueDisabled, villageV: false });
        setDataVillages([]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleVillage = () => {
    addressServices.getVillage(inputValues.districtId).then(
      (response) => {
        setDataVillages(response);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function handleChange(event) {
    const { name, value } = event.target;
    if (value.length === 0) {
      setInputValue({ ...inputValues, [name]: null });
    } else {
      setInputValue({ ...inputValues, [name]: value });
    }
  }
  function reset(event) {
    setInputValue({
      code: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      postalCode: "",
      taxNumber: "",
      kusuka: "",
      countryId: "",
      provinceId: "",
      regencyId: "",
      districtId: "",
      villageId: "",
    });
  }
  const addressServices = new AddressServices();
  const [loading, setLoading] = useState(false);
  const services = new CompanyService();
  const navigate = useNavigate();
  const returnPage = () => {
    navigate("/company");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await services.updateCompany(id, inputValues).then((res) => {
      if (res === true) {
        // setStatus(response);
        snackActions.success("Success update Company");
      } else {
        //    console.log(res);
        snackActions.error("Failed to update Company!");
      }
    });

    setTimeout(() => {
      navigate("/company");
    }, 500);
  };

  return (
    <>
      <Grid item xs={12}>
        <IconButton color="secondary" fontSize="medium" onClick={returnPage}>
          <KeyboardBackspaceTwoToneIcon color="primary" fontSize="large" />
        </IconButton>
      </Grid>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          mb: 2,
        }}>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off">
          <ValidatorForm
            component="form"
            sx={{ mt: 1 }}
            // noValidate
            onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* {res ? (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Data company berhasil tersimpan
                  </Alert>
                </Grid>
              ) : (
                <Box sx={{ display: "none" }}></Box>
              )} */}

              <Grid item xs={2}>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Company Code"
                  name="code"
                  autoComplete="code"
                  autoFocus
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.code}
                  InputProps={{
                    readOnly: true,
                  }}
                  // validators={["required"]}
                  // errorMessages={["Username is required"]}
                />
              </Grid>

              <Grid item xs={10}>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Company Name"
                  id="name"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.name}
                />
              </Grid>
              <Grid item xs={8}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="address"
                  label="Company Address"
                  id="address"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.address}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  id="countryId"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="countryId"
                  label="Country"
                  variant="standard"
                  margin="normal"
                  onFocus={handleCountry}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.countryId}
                  fullWidth>
                  {dataCountry.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  id="province"
                  select
                  name="provinceId"
                  InputLabelProps={{
                    shrink:
                      inputValues.provinceId !== "" || null ? true : false,
                  }}
                  label="Province"
                  variant="standard"
                  margin="normal"
                  onFocus={handleProvince}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.provinceId}
                  fullWidth>
                  {dataProvince.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  id="regency"
                  select
                  // disabled={valueDisabled.regencyV}
                  name="regencyId"
                  label="Regency"
                  defaultValue="SKK"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: inputValues.regencyId !== null ? true : false,
                  }}
                  onFocus={handleRegency}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.regencyId}>
                  {dataRegency.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  id="districtId"
                  select
                  // disabled={valueDisabled.districtV}
                  label="District"
                  variant="standard"
                  margin="normal"
                  name="districtId"
                  fullWidth
                  InputLabelProps={{
                    shrink: inputValues.districtId !== null ? true : false,
                  }}
                  onFocus={handleDistrict}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.districtId}>
                  {dataDistrict.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  id="villageId"
                  select
                  // disabled={valueDisabled.villageV}
                  label="Village"
                  name="villageId"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: inputValues.villageId !== null ? true : false,
                  }}
                  onFocus={handleVillage}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.villageId}>
                  {dataVilage.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="postalCode"
                  label="Postal Code"
                  id="postalCode"
                  variant="standard"
                  InputLabelProps={{
                    shrink: inputValues.postalCode !== null ? true : false,
                  }}
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.postalCode}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.email}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  variant="standard"
                  InputLabelProps={{
                    shrink: inputValues.phone !== null ? true : false,
                  }}
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.phone}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="taxNumber"
                  label="NPWP"
                  id="taxNumber"
                  variant="standard"
                  InputLabelProps={{
                    shrink: inputValues.taxNumber !== null ? true : false,
                  }}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.taxNumber}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <TextValidator
                  margin="normal"
                  fullWidth
                  name="kusuka"
                  label="No Kusuka"
                  id="kusuka"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  value={inputValues.kusuka}
                  onChange={(e) => handleChange(e)}
                /> */}
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Kusuka
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="kusuka"
                    value={inputValues.kusuka}
                    onChange={(e) => handleChange(e)}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-evenly"
                  // spacing={2}
                  // mt={3}
                  border={1}
                  p={2}
                  sx={{
                    backgroundColor: alpha(bck, 0.7),
                  }}>
                  <Typography variant="body2" display="block" gutterBottom>
                    Company Logo
                  </Typography>
                  <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              spacing={0.5}
              justifyContent="center"
              alignItems="flex-end">
              <Grid container>
                <Grid item xs={4}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    // onClick={this.handleButton}
                    loading={loading}
                    // ref={(c) => {
                    //   this.checkBtn = c;
                    // }}
                  >
                    Update
                  </LoadingButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4}>
                  <LoadingButton
                    fullWidth
                    variant="outlined"
                    onClick={reset}
                    sx={{ mt: 1 }}
                    // onClick={this.handleButton}
                    // loading={this.state.loading}
                    // ref={(c) => {
                    //   this.checkBtn = c;
                    // }}
                  >
                    Reset
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
            // onClick={handleCloseBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Paper>
    </>
  );
}
