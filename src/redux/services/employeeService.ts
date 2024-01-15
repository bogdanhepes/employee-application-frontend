import axios from "axios";
import { apiURL } from "../apiURL";
import { auth } from "../auth";

export const getAllEmployees = () =>
  axios.get(apiURL + "employee", auth).then((response) => response.data);

export const getEmployeeById = (id: number) =>
  axios.get(apiURL + `employee/${id}`, auth).then((response) => response.data);

export const updateEmployeeInformation = (
  id: number,
  name: string,
  email: string,
  username: string
) =>
  axios.put(
    apiURL + `employee/${id}`,
    {
      name: name,
      email: email,
      username: username,
    },
    auth
  );

export const getAllEmployeesByDepartment = (id: number) =>
  axios
    .get(apiURL + `getAllEmployeesByDepartment/${id}`, auth)
    .then((response) => response.data);

export const getEmployeeByUsername = (username: string) =>
  axios
    .get(apiURL + `employee/username/${username}`, auth)
    .then((response) => response.data);
