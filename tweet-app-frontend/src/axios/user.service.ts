import axios from "axios";
import TokenService from "./auth-header";

const API_URL = "http://localhost:6868/api/v1_0/tweets/users/";

class UserService {
  getUser(username: string) {
    return axios
      .get(API_URL + username, { headers: TokenService.authHeader() })
      .then(response => {
        console.log(response)
        return response.data[0].value;
      });
  }
}

export default new UserService();