import axios from "axios";
import { IPostTweet, ITweet } from "src/types/user-state";
import TokenService from "./auth-header";

const API_URL = "http://localhost:6868/api/v1_0/tweets/";

class TweetService {
  postTweet(tweet: IPostTweet) {
    return axios
      .post(API_URL + "add", tweet, { headers: TokenService.authHeader() })
      .then(response => {
        console.log(response)
        return response.data;
      });
  }

  getAllTweets() {
    return axios
      .get(API_URL + "getAllTweets")
      .then(response => {
        console.log(response)
        return response.data;
      });
  }

  getAllTweetsUser(loginID: String) {
    return axios
      .get(API_URL + `${loginID}/all`, { headers: TokenService.authHeader() })
      .then(response => {
        console.log(response)
        return response.data;
      });
  }

  getTweetsTypeUser(loginID: String, type: String) {
    return axios
      .get(API_URL + `${loginID}/all/${type}`, { headers: TokenService.authHeader() })
      .then(response => {
        console.log(response)
        return response.data;
      });
  }
}

export default new TweetService();