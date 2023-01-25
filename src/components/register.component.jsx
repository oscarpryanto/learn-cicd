import { Component } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withRouter } from "../common/with-router";
import "../App.css";
import { blueGrey } from "@mui/material/colors";
import img_register from "../image/4.png";
import { alpha } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AuthService from "../services/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Images from "../image/6.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="primary.contrastText"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="primary.contrastText" href="https://sahabatlautlestari.com">
        Perahu
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const bck = blueGrey[100];

// this.state={
//   errorpass:" ",
// }

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      // <div className="alert alert-danger" role="alert">
      //   The password must be between 6 and 40 characters.
      // </div>
      // this.setState={
      //   errorMessages:"The password must be between 6 and 40 characters."
      // }
      this.setState({
        errorpass: "The password must be between 6 and 40 characters.",
      })
    );
  }
};

const theme = createTheme();
const site = [
  { label: "Site Coordinator", id: 1 },
  { label: "Field Staff", id: 2 },
];

class Register extends Component {
  // const [value, setValue] = React.useState(site[0]);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const valueSite = value.label;

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    //this.onChangeroles = this.onChangeRoles.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
      roles: "",
      loading: false,
      submitted: false,
      errorMessages: "",
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
      submitted: true,
    });

    // this.form.validateAll();

    if (this.state.submitted === true) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          style={{
            backgroundImage: `url(${Images})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          sx={{
            minWidth: "1vw",
            minHeight: "10vh",
            backgroundColor: "secondary.main",
          }}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{ p: 8, height: "100vh" }}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 5,
                p: 5,
                borderRadius: 3,
                backgroundColor: alpha(bck, 0.7),
              }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <ValidatorForm
                component="form"
                onSubmit={this.handleRegister}
                noValidate
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
                  <Grid item xs={12}>
                    <TextValidator
                      required
                      fullWidth
                      id="username"
                      label="UserName"
                      name="username"
                      autoComplete="username"
                      validators={["required"]}
                      errorMessages={["Username is required"]}
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Email is required",
                        "email is not valid",
                      ]}
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      required
                      id="combo-box-demo"
                      name="roles"
                      //  value={value}
                      //  onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                      //  getOptionLabel={(option) => option.label.toString()}
                      options={site}
                      // sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextValidator
                          {...params}
                          label="Roles"
                          validators={["required"]}
                          errorMessages={["Roles is required"]}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      validators={["required"]}
                      errorMessages={["Password is required"]}
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/Login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Box>
            <Copyright sx={{ mt: 4 }} />
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default withRouter(Register);
