import Avatar from "@mui/material/Avatar";
// import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { Component } from "react";
import { withRouter } from "../common/with-router";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
//import {Link} from "react-router-dom";
import Link from "@mui/material/Link";
import AuthService from "../services/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import { snackActions } from "./snackbar";
import authService from "../services/auth.service";
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
// const useStyles = makeStyles({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const theme = createTheme();
const bck = blueGrey[100];
class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      submitted: false,
      errorMessages: "",
      messages: "",
      ress: null,
    };
  }
  alertInfo = () => {
    snackActions.success("Login Success");
  };
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

  async handleLogin() {
    this.setState({
      loading: true,
    });
    try {
      const response = await authService.login(
        this.state.username,
        this.state.password
      );
      if (response.data.status === "Success") {
        this.alertInfo();
        console.log(response);
        setTimeout(() => {
          this.props.router.navigate("/");
          window.location.reload();
          this.setState({
            loading: false,
          });
        }, 3000);
      }
    } catch (error) {
      const err = error.response.data.message;
      this.setState({
        loading: false,
        messages: err,
      });
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
          }}>
          <Container
            component="main"
            maxWidth="xs"
            fixed
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
                Sign in
              </Typography>
              <ValidatorForm
                component="form"
                onSubmit={this.handleLogin}
                noValidate
                sx={{ mt: 1 }}>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.onChangeUsername}
                  value={this.state.username}
                  validators={["required"]}
                  errorMessages={["Username is required"]}
                />
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  validators={["required"]}
                  errorMessages={["Password is required"]}
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <LoadingButton
                  type="submit"
                  loading={this.state.loading}
                  fullWidth
                  onClick={this.handleLogin}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // ref={(c) => {
                  //   this.checkBtn = c;
                  // }}
                >
                  Sign In
                </LoadingButton>
                {this.state.messages && (
                  <Alert severity="error">{this.state.messages}</Alert>
                )}
                {/* <LoadingButton loading variant="contained">
                Submit
              </LoadingButton> */}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/Register" variant="body2">
                      {"Don't have an account? Sign Up"}
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

export default withRouter(Signin);
