import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: process.env.PUBLIC_URL + "/api/",
});
