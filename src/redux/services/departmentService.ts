import axios from "axios";
import { apiURL } from "../apiURL";
import { auth } from "../auth";

export const getAllDepartments = () =>
  axios.get(apiURL + "department", auth).then((response) => response.data);

export const getDepartmentById = (id: number) =>
  axios
    .get(apiURL + `department/${id}`, auth)
    .then((response) => response.data);

export const getManagerOfDepartment = (id: number) =>
  axios
    .get(apiURL + `${id}/getManager`, auth)
    .then((response) => response.data);
