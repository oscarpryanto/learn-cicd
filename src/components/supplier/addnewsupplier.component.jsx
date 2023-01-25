import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import SupplierServices from "../../services/supplier/supplier.service";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceTwoToneIcon from "@mui/icons-material/KeyboardBackspaceTwoTone";
import { snackActions } from "../snackbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddressServices from "../../services/master.address";

const bck = blueGrey[100];

export default function AddSupplier() {
  const [inputValues, setInputValue] = useState({
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
      code: null,
      name: null,
      address: null,
      countryId: null,
      provinceId: null,
      regencyId: null,
      districtId: null,
      villageId: null,
      postalCode: null,
      email: null,
      phone: null,
      taxNumber: null,
      nib: null,
      siup: null,
      logo: null,
    });
  }

  const [loading, setLoading] = useState(false);
  const [errM, setErrM] = useState("");
  const [errMI, setErrMI] = useState("");
  const addressServices = new AddressServices();
  //   const [errorProp, setErrorProp] = useState(false);
  const services = new SupplierServices();
  const navigate = useNavigate();
  const returnPage = () => {
    navigate("/supplier");
  };

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
  React.useEffect(() => {
    // Set errorMessage only if text is equal or bigger than MAX_LENGTH
    if (/^[a-zA-Z ]+$/.test(inputValues.siup) !== null) {
      //  setErrorProp(true);
      setErrM("");
    }
    if (/^[a-zA-Z ]+$/.test(inputValues.nib) !== null) {
      //  setErrorProp(true);
      setErrMI("");
    }
  }, [inputValues.nib, inputValues.siup]);
  React.useEffect(() => {
    // Set errorMessage only if text is equal or bigger than MAX_LENGTH
    if (/^[a-zA-Z ]+$/.test(inputValues.siup)) {
      //  setErrorProp(false);
      setErrM("Please input number only!");
    }
    if (/^[a-zA-Z ]+$/.test(inputValues.nib)) {
      //  setErrorProp(false);
      setErrMI("Please input number only!");
    }
  }, [inputValues.nib, errM, inputValues.siup, errMI]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);
    setLoading(true);
    await services.addSuppliers(inputValues).then((res) => {
      if (res === true) {
        // setStatus(response);
        snackActions.success("Success add new Fisherman");
      } else {
        console.log(res);
        snackActions.error(res.response.data.message);
      }
    });

    setTimeout(() => {
      navigate("/supplier");
    }, 3000);
  };

  return (
    <>
      <Grid item xs={12}>
        <IconButton color="secondary" fontsize="medium" onClick={returnPage}>
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
              <Grid item xs={2}>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Supplier Code"
                  name="code"
                  autoComplete="code"
                  autoFocus
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.code}
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
                  label="Supplier Name"
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
                  //    helperText={errM}
                  //    error={/^[a-zA-Z ]+$/.test(inputValues.nationalId)}
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.address}
                  // validators={["required"]}
                  // errorMessages={["Username is required"]}
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  id="countryId"
                  select
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
                  disabled={valueDisabled.provinceV}
                  name="provinceId"
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
                  disabled={valueDisabled.regencyV}
                  name="regencyId"
                  label="Regency"
                  defaultValue="SKK"
                  variant="standard"
                  margin="normal"
                  fullWidth
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
                  disabled={valueDisabled.districtV}
                  label="District"
                  variant="standard"
                  margin="normal"
                  name="districtId"
                  fullWidth
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
                  disabled={valueDisabled.villageV}
                  label="Village"
                  name="villageId"
                  variant="standard"
                  margin="normal"
                  fullWidth
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
                  onChange={(e) => handleChange(e)}
                  value={inputValues.taxNumber}
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  helperText={errMI}
                  error={
                    inputValues.nib === null
                      ? false
                      : /^[a-zA-Z ]+$/.test(inputValues.nib)
                  }
                  name="nib"
                  label="Nomor Izin Berusaha"
                  id="nib"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.nib}
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  helperText={errM}
                  error={
                    inputValues.siup === null
                      ? false
                      : /^[a-zA-Z ]+$/.test(inputValues.siup)
                  }
                  name="siup"
                  label="Surat Izin  Berusaha Perdagangan"
                  id="siup"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.siup}
                />
              </Grid>

              <Grid item xs={4}>
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
                    Supplier Logo
                  </Typography>
                  <Button variant="contained" component="label">
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      id="logo"
                      name="logo"
                      value={inputValues.logo}
                      onChange={(e) => handleChange(e)}
                    />
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
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4}>
                  <LoadingButton
                    fullWidth
                    variant="outlined"
                    onClick={reset}
                    sx={{ mt: 1 }}>
                    Reset
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Box>
      </Paper>
    </>
  );
}
