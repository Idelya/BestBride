import SETTINGS from "./settings";
import axios from "axios";
import Cookies from "cookies";

const request = axios.create({
  baseURL: SETTINGS.server,
  headers: { ApiKey: SETTINGS.apikey || "" },
});

export default request;
