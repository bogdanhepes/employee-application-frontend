import axios from "axios";
import { apiURL } from "../apiURL";

export const login = (username: string, password: string) =>
  axios
    .get(apiURL + "authentication", {
      headers: {
        username: username,
        password: password,
      },
    })
    .then((response) => response.data);
