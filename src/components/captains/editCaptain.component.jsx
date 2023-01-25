import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { blueGrey } from "@mui/material/colors";
import FisherService from "../../services/fisher/fisher.service";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceTwoToneIcon from "@mui/icons-material/KeyboardBackspaceTwoTone";
import { snackActions } from "../snackbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useParams } from "react-router-dom";
import AddressServices from "../../services/master.address";
const bck = blueGrey[100];

export default function AddFisherman() {
  const { id } = useParams();
  const [dataCountry, setDataCountry] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const role = "captain";
  const [dataRegency, setDataRegency] = useState([]);
  const [dataDistrict, setDataDistricts] = useState([]);
  const [dataVilage, setDataVillages] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const addressServices = new AddressServices();
  const [valueDisabled, setValueDisabled] = useState({
    provinceV: true,
    regencyV: true,
    districtV: true,
    villageV: true,
  });
  const [inputValues, setInputValue] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: null,
    nationalId: null,
    familyId: null,
    postalCode: null,
    taxNumber: null,
    kusuka: false,
    countryId: null,
    provinceId: null,
    regencyId: null,
    districtId: null,
    villageId: null,
  });
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      services
        .getFishermansById(id, role)
        .then((fishermanData) => {
          if (fishermanData) {
            setOpenBackdrop(false);
            console.log(fishermanData);
            setInputValue({
              firstName: fishermanData.firstName,
              lastName: fishermanData.lastName,
              address: fishermanData.address,
              email: fishermanData.email,
              phone: fishermanData.phone,
              nationalId: fishermanData.nationalId,
              familyId: fishermanData.familyId,
              postalCode: fishermanData.postalCode,
              taxNumber: fishermanData.taxNumber,
              kusuka: fishermanData.kusuka,
              countryId: fishermanData.countryId,
              provinceId: fishermanData.provinceId,
              regencyId: fishermanData.regencyId,
              districtId: fishermanData.districtId,
              villageId: fishermanData.villageId,
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
    setInputValue({ ...inputValues, [name]: value });
    if (value.length === 0) {
      setInputValue({ ...inputValues, [name]: null });
    } else {
      setInputValue({ ...inputValues, [name]: value });
    }
  }
  function reset(event) {
    setInputValue({
      lastName: "",
      address: "",
      email: "",
      phone: null,
      nationalId: null,
      familyId: null,
      postalCode: null,
      taxNumber: null,
      kusuka: false,
      countryId: null,
      provinceId: null,
      regencyId: null,
      districtId: null,
      villageId: null,
    });
  }

  const [loading, setLoading] = useState(false);
  const [errM, setErrM] = useState("");
  const [errMI, setErrMI] = useState("");
  //   const [errorProp, setErrorProp] = useState(false);
  const services = new FisherService();
  const navigate = useNavigate();
  const returnPage = () => {
    navigate("/captain");
  };

  React.useEffect(() => {
    // Set errorMessage only if text is equal or bigger than MAX_LENGTH
    if (/^[a-zA-Z ]+$/.test(inputValues.nationalId) !== true) {
      //  setErrorProp(true);
      setErrM("");
    }
    if (/^[a-zA-Z ]+$/.test(inputValues.familyId) !== true) {
      //  setErrorProp(true);
      setErrMI("");
    }
  }, [inputValues.nationalId, inputValues.familyId]);
  React.useEffect(() => {
    // Set errorMessage only if text is equal or bigger than MAX_LENGTH
    if (/^[a-zA-Z ]+$/.test(inputValues.nationalId)) {
      //  setErrorProp(false);
      setErrM("Please input number only!");
    }
    if (/^[a-zA-Z ]+$/.test(inputValues.familyId)) {
      //  setErrorProp(false);
      setErrMI("Please input number only!");
    }
  }, [inputValues.nationalId, errM, inputValues.familyId, errMI]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);
    setLoading(true);
    await services.updateFishermans(id, role, inputValues).then((res) => {
      if (res === true) {
        // setStatus(response);
        snackActions.success("Success add new Fisherman");
      } else {
        console.log(res);
        snackActions.error(res.response.data.message);
      }
    });

    setTimeout(() => {
      navigate("/captain");
    }, 100);
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
              <Grid item xs={6}>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.firstName}
                  // validators={["required"]}
                  // errorMessages={["Username is required"]}
                />
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  id="lastName"
                  variant="standard"
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.lastName}
                />
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  helperText={errM}
                  error={
                    inputValues.nationalId === null
                      ? false
                      : /^[a-zA-Z ]+$/.test(inputValues.nationalId)
                  }
                  id="nationalId"
                  InputLabelProps={{
                    shrink: inputValues.nationalId !== null ? true : false,
                  }}
                  label="National ID"
                  name="nationalId"
                  autoComplete="nationalId"
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.nationalId}
                  // validators={["required"]}
                  // errorMessages={["Username is required"]}
                />
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  helperText={errMI}
                  error={
                    inputValues.familyId === null
                      ? false
                      : /^[a-zA-Z ]+$/.test(inputValues.familyId)
                  }
                  name="familyId"
                  label="Family ID"
                  id="familyId"
                  variant="standard"
                  InputLabelProps={{
                    shrink: inputValues.familyId !== null ? true : false,
                  }}
                  // validators={["required"]}
                  // errorMessages={["Password is required"]}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.familyId}
                />
              </Grid>
              <Grid item xs={8}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="address"
                  label="Address"
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
                  name="countryId"
                  label="Country"
                  variant="standard"
                  margin="normal"
                  onFocus={handleCountry}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.countryId}
                  InputLabelProps={{
                    shrink: inputValues.countryId !== null ? true : false,
                  }}
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
                  label="Province"
                  variant="standard"
                  margin="normal"
                  onFocus={handleProvince}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.provinceId}
                  InputLabelProps={{
                    shrink: inputValues.provinceId !== null ? true : false,
                  }}
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
                  onFocus={handleRegency}
                  onChange={(e) => handleChange(e)}
                  InputLabelProps={{
                    shrink: inputValues.regencyId !== null ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: inputValues.districtId !== null ? true : false,
                  }}
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
                  // disabled={valueDisabled.villageV}
                  label="Village"
                  name="villageId"
                  variant="standard"
                  margin="normal"
                  InputLabelProps={{
                    shrink: inputValues.villageId !== null ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: inputValues.postalCode !== null ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: inputValues.phone !== null ? true : false,
                  }}
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
                  InputLabelProps={{
                    shrink: inputValues.taxNumber !== null ? true : false,
                  }}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.taxNumber}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Kusuka
                  </FormLabel>
                  <RadioGroup
                    row
                    // aria-labelledby="demo-controlled-radio-buttons-group"
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
