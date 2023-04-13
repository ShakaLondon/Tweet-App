import axios from "axios";

const API_URL = "http://localhost:6868/api/v1_0/tweets/users/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register( firstName: string, lastName: string, email: string, loginID: string, password: string, contactNumber: string, tweetList?: Array<String>, role?: Array<String> ) { 
    return axios.post(API_URL + "register", {
        firstName,
        lastName,
        email,
        loginID,
        password,
        contactNumber,
        role,
        tweetList
    })
    .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') as string);;
  }
}

export default new AuthService();