import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Employee } from "../../utils/interfacesAndTypes";
import {
  getAllEmployees,
  getAllEmployeesByDepartment,
  getEmployeeById,
  updateEmployeeInformation as doUpdateEmployeeInformation,
  getEmployeeByUsername,
} from "../services/employeeService";

// Constants
const START_LOAD_EMPLOYEES = "employee/START_LOAD_EMPLOYEES";
const COMPLETE_LOAD_EMPLOYEES = "employee/COMPLETE_LOAD_EMPLOYEES";
const FAIL_LOAD_EMPLOYEES = "employee/FAIL_LOAD_EMPLOYEES";

const START_LOAD_EMPLOYEE = "employee/START_LOAD_EMPLOYEE";
const COMPLETE_LOAD_EMPLOYEE = "employee/COMPLETE_LOAD_EMPLOYEE";
const FAIL_LOAD_EMPLOYEE = "employee/FAIL_LOAD_EMPLOYEE";

const START_LOAD_MANAGER = "employee/START_LOAD_MANAGER";
const COMPLETE_LOAD_MANAGER = "employee/COMPLETE_LOAD_MANAGER";
const FAIL_LOAD_MANAGER = "employee/FAIL_LOAD_MANAGER";

const START_UPDATE_EMPLOYEE_INFORMATION =
  "employee/START_UPDATE_EMPLOYEE_INFORMATION";
const COMPLETE_UPDATE_EMPLOYEE_INFORMATION =
  "employee/COMPLETE_UPDATE_EMPLOYEE_INFORMATION";
const FAIL_UPDATE_EMPLOYEE_INFORMATION =
  "employee/FAIL_UPDATE_EMPLOYEE_INFORMATION";

const START_LOAD_EMPLOYEES_BY_DEPARTMENT =
  "employee/START_LOAD_EMPLOYEES_BY_DEPARTMENT";
const COMPLETE_LOAD_EMPLOYEES_BY_DEPARTMENT =
  "employee/COMPLETE_LOAD_EMPLOYEES_BY_DEPARTMENT";
const FAIL_LOAD_EMPLOYEES_BY_DEPARTMENT =
  "employee/FAIL_LOAD_EMPLOYEES_BY_DEPARTMENT";

const START_LOAD_EMPLOYEE_BY_USERNAME =
  "employee/START_LOAD_EMPLOYEE_BY_USERNAME";
const COMPLETE_LOAD_EMPLOYEE_BY_USERNAME =
  "employee/COMPLETE_LOAD_EMPLOYEE_BY_USERNAME";
const FAIL_LOAD_EMPLOYEE_BY_USERNAME =
  "employee/FAIL_LOAD_EMPLOYEE_BY_USERNAME";

interface State {
  isLoading: boolean;
  employees: Employee[];
  employeesOfDepartment: Employee[];
  employee: Employee;
  manager: Employee;
}

type Dispatch = ThunkDispatch<State, any, AnyAction>;

// Initial State
const initialState: State = {
  isLoading: false,
  employees: [] as Employee[],
  employeesOfDepartment: [] as Employee[],
  employee: {} as Employee,
  manager: {} as Employee,
};

// Action Creators
const startLoadEmployees = () => ({
  type: START_LOAD_EMPLOYEES,
});

const completeLoadEmployees = (employees: Employee[]) => ({
  type: COMPLETE_LOAD_EMPLOYEES,
  employees,
});

const failLoadEmployees = () => ({
  type: FAIL_LOAD_EMPLOYEES,
});

const startLoadEmployee = () => ({
  type: START_LOAD_EMPLOYEE,
});

const completeLoadEmployee = (employee: Employee) => ({
  type: COMPLETE_LOAD_EMPLOYEE,
  employee,
});

const failLoadEmployee = () => ({
  type: FAIL_LOAD_EMPLOYEE,
});

const startLoadManager = () => ({
  type: START_LOAD_MANAGER,
});

const completeLoadManager = (manager: Employee) => ({
  type: COMPLETE_LOAD_MANAGER,
  manager,
});

const failLoadManager = () => ({
  type: FAIL_LOAD_MANAGER,
});

const startLoadEmployeesByDepartment = () => ({
  type: START_LOAD_EMPLOYEES_BY_DEPARTMENT,
});

const completeLoadEmployeesByDepartment = (
  employeesOfDepartment: Employee[]
) => ({
  type: COMPLETE_LOAD_EMPLOYEES_BY_DEPARTMENT,
  employeesOfDepartment,
});

const failLoadEmployeesByDepartment = () => ({
  type: FAIL_LOAD_EMPLOYEES_BY_DEPARTMENT,
});

const startUpdateEmployee = () => ({
  type: START_UPDATE_EMPLOYEE_INFORMATION,
});

const completeUpdateEmployee = () => ({
  type: COMPLETE_UPDATE_EMPLOYEE_INFORMATION,
});

const failUpdateEmployee = () => ({
  type: FAIL_UPDATE_EMPLOYEE_INFORMATION,
});

const startLoadEmployeeByUsername = () => ({
  type: START_LOAD_EMPLOYEE_BY_USERNAME,
});
const completeLoadEmployeeByUsername = (employee: Employee) => ({
  type: COMPLETE_LOAD_EMPLOYEE_BY_USERNAME,
  employee,
});
const failLoadEmployeeByUsername = () => ({
  type: FAIL_LOAD_EMPLOYEE_BY_USERNAME,
});

// Async Actions
export const loadEmployees = () => (dispatch: Dispatch) => {
  dispatch(startLoadEmployees());
  const loadEmployeesPromise = getAllEmployees();
  loadEmployeesPromise
    .then((data) => dispatch(completeLoadEmployees(data)))
    .catch(() => dispatch(failLoadEmployees()));
  return loadEmployeesPromise;
};

export const loadEmployee = (id: number) => (dispatch: Dispatch) => {
  dispatch(startLoadEmployee());
  const loadEmployeePromise = getEmployeeById(id);
  loadEmployeePromise
    .then((data) => dispatch(completeLoadEmployee(data)))
    .catch(() => dispatch(failLoadEmployee()));
  return loadEmployeePromise;
};

export const loadManager = (id: number) => (dispatch: Dispatch) => {
  dispatch(startLoadManager());
  const loadManagerPromise = getEmployeeById(id);
  loadManagerPromise
    .then((data) => dispatch(completeLoadManager(data)))
    .catch(() => dispatch(failLoadManager()));
  return loadManagerPromise;
};

export const loadEmployeeByUsername =
  (username: string) => (dispatch: Dispatch) => {
    dispatch(startLoadEmployeeByUsername());
    const loadEmployeeByUsernamePromise = getEmployeeByUsername(username);
    loadEmployeeByUsernamePromise
      .then((data) => dispatch(completeLoadEmployeeByUsername(data)))
      .catch(() => dispatch(failLoadEmployeeByUsername()));
    return loadEmployeeByUsernamePromise;
  };

export const loadEmployeesByDepartment =
  (id: number) => (dispatch: Dispatch) => {
    dispatch(startLoadEmployeesByDepartment());
    const loadEmployeesByDepartmentPromise = getAllEmployeesByDepartment(id);
    loadEmployeesByDepartmentPromise
      .then((data) => dispatch(completeLoadEmployeesByDepartment(data)))
      .catch(() => dispatch(failLoadEmployeesByDepartment()));
    return loadEmployeesByDepartmentPromise;
  };

export const updateEmployeeInformation =
  (id: number, name: string, email: string, username: string) =>
  (dispatch: Dispatch) => {
    dispatch(startUpdateEmployee());
    const updateEmployeeInformationPromise = doUpdateEmployeeInformation(
      id,
      name,
      email,
      username
    );
    updateEmployeeInformationPromise
      .then(() => dispatch(completeUpdateEmployee()))
      .catch(() => dispatch(failUpdateEmployee()));
    return updateEmployeeInformationPromise;
  };

// Reducer
export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOAD_EMPLOYEES:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
        employees: action.employees,
      };
    case START_LOAD_EMPLOYEE:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_EMPLOYEE:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_EMPLOYEE:
      return {
        ...state,
        isLoading: false,
        employee: action.employee,
      };

    case START_LOAD_MANAGER:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_MANAGER:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_MANAGER:
      return {
        ...state,
        isLoading: false,
        manager: action.manager,
      };
    case START_LOAD_EMPLOYEES_BY_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_EMPLOYEES_BY_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_EMPLOYEES_BY_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        employeesOfDepartment: action.employeesOfDepartment,
      };
    case START_UPDATE_EMPLOYEE_INFORMATION:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_UPDATE_EMPLOYEE_INFORMATION:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_UPDATE_EMPLOYEE_INFORMATION:
      return {
        ...state,
        isLoading: false,
        employees: action.employees,
      };

    case START_LOAD_EMPLOYEE_BY_USERNAME:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_EMPLOYEE_BY_USERNAME:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_EMPLOYEE_BY_USERNAME:
      return {
        ...state,
        isLoading: false,
        employee: action.employee,
      };

    default:
      return state;
  }
};
