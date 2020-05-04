import axios from "axios";
import {
  API_BASE_URL,
  API_TIMEOUT,
  API_RESPONSE_TYPE,
  API_REQUEST_TYPE,
  API_REQUEST_DEFAULT_ENCODING,
} from "react-native-dotenv";

const getAxiosInstance = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: parseInt(API_TIMEOUT, 10),
    headers: {
      Accept: API_REQUEST_TYPE,
      "Content-Type": API_REQUEST_TYPE,
    },
    responseType: API_RESPONSE_TYPE,
    responseEncoding: API_REQUEST_DEFAULT_ENCODING,
  });
};

export default getAxiosInstance;
