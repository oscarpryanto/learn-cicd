import axios from "axios";
import { json } from "react-router-dom";

const API_URL = "https://perahu.et.r.appspot.com/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          // console.log(response);
        } 
        // console.log(response.data);
        return response;
       });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles: [
        {
          role:"site_coordinator",
          site:"883a0a13-8541-4cfc-ae20-f082717cc23c"
        }
      ]
    });
  }

  getAuthorities() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authorities) {
      return user.authorities;
    } else {
      return [];
    }
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  isLogedIn(){
    const user = json.parse(localStorage.getItem('user'));
    if (user){
      return true;
    } else{
      return false;
    }
  }
}

export default new AuthService();
