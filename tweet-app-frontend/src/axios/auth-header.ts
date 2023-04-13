import axios from "axios";
import authService from "./auth.service";

  const API_URL = "http://localhost:6868/api/v1_0/token/";

  class TokenService {
    authHeader() {
      const token = this.getTokenItem()
    
      if (token) {
        return { authorization: 'Bearer ' + token };
      } else {
        return {};
      }
    }

    getUserItem() {
      return JSON.parse(localStorage.getItem('user') as string);
    }

    getTokenItem() {
      return JSON.parse(localStorage.getItem('token') as string);
    }

    checkCredentials() {
      if (this.authHeader().authorization) {
      return axios
        .get(API_URL + "verify", { headers: this.authHeader() })
        .then(response => {
          console.log(response, "token response")
          if (response.data.verified) {
          return true
          } else {
            return false
          }
        }).catch(error => {
          authService.logout()
          console.log(error, "token response error")
          return false
        });
      } else {
        return false 
      }
    }
  }
  
  export default new TokenService();