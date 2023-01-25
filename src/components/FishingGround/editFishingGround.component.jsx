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
import FishingGroundService from "../../services/fishingGround/fishingGround.services";
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
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [inputValues, setInputValue] = useState({
    code: "",
    name: "",
    description: "",
  });

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    if (value.length === 0) {
      setInputValue({ ...inputValues, [name]: null });
    } else {
      setInputValue({ ...inputValues, [name]: value });
    }
  }

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      services
        .getFishingGroundById(id)
        .then((FishingGroundData) => {
          if (FishingGroundData) {
            setOpenBackdrop(false);
            console.log(FishingGroundData);
            setInputValue({
              code: FishingGroundData.code,
              name: FishingGroundData.name,
              description: FishingGroundData.description,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setOpenBackdrop(false);
        });
    }, 100);
  }, []);

  function reset(event) {
    setInputValue({
      code: null,
      name: "",
      description: "",
    });
  }

  const [loading, setLoading] = useState(false);
  const services = new FishingGroundService();
  const navigate = useNavigate();
  const returnPage = () => {
    navigate("/fishing-ground");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);
    setLoading(true);
    await services.updateFishingGround(id, inputValues).then((res) => {
      if (res === true) {
        // setStatus(response);
        snackActions.success("Success update Fishing Ground");
      } else {
        console.log(res);
        snackActions.error(res.response.data.message);
      }
    });

    setTimeout(() => {
      navigate("/fishing-ground");
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
                  id="code"
                  label="Fishing Ground Code"
                  name="code"
                  autoComplete="code"
                  autoFocus
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={(e) => handleChange(e)}
                  value={inputValues.code}
                />
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Fishing Ground Name"
                  id="name"
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                  value={inputValues.description}
                  // validators={["required"]}
                  // errorMessages={["Username is required"]}
                />
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
