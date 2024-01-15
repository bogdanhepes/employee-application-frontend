import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Department, Employee } from "../../utils/interfacesAndTypes";
import {
  getAllDepartments,
  getDepartmentById,
  getManagerOfDepartment,
} from "../services/departmentService";

// Constants
const START_LOAD_DEPARTMENTS = "department/START_LOAD_DEPARTMENTS";
const COMPLETE_LOAD_DEPARTMENTS = "department/COMPLETE_LOAD_DEPARTMENTS";
const FAIL_LOAD_DEPARTMENTS = "department/FAIL_LOAD_DEPARTMENTS";

const START_LOAD_DEPARTMENT = "department/START_LOAD_DEPARTMENT";
const COMPLETE_LOAD_DEPARTMENT = "department/COMPLETE_LOAD_DEPARTMENT";
const FAIL_LOAD_DEPARTMENT = "department/FAIL_LOAD_DEPARTMENT";

const START_LOAD_MANAGER_OF_DEPARTMENT =
  "employee/START_LOAD_MANAGER_OF_DEPARTMENT";
const COMPLETE_LOAD_MANAGER_OF_DEPARTMENT =
  "employee/COMPLETE_LOAD_MANAGER_OF_DEPARTMENT";
const FAIL_LOAD_MANAGER_OF_DEPARTMENT =
  "employee/FAIL_LOAD_MANAGER_OF_DEPARTMENT";

interface State {
  isLoading: boolean;
  departments: Department[];
  department: Department;
  manager: Employee;
}

type Dispatch = ThunkDispatch<State, any, AnyAction>;

// Initial State
const initialState: State = {
  isLoading: false,
  departments: [] as Department[],
  department: {} as Department,
  manager: {} as Employee,
};

// Action Creators
const startLoadDepartments = () => ({
  type: START_LOAD_DEPARTMENTS,
});

const completeLoadDepartments = (departments: Department[]) => ({
  type: COMPLETE_LOAD_DEPARTMENTS,
  departments,
});

const failLoadDepartments = () => ({
  type: FAIL_LOAD_DEPARTMENTS,
});

const startLoadDepartment = () => ({
  type: START_LOAD_DEPARTMENT,
});

const completeLoadDepartment = (department: Department) => ({
  type: COMPLETE_LOAD_DEPARTMENT,
  department,
});

const failLoadDepartment = () => ({
  type: FAIL_LOAD_DEPARTMENT,
});

const startLoadManagerOfDepartment = () => ({
  type: START_LOAD_MANAGER_OF_DEPARTMENT,
});

const completeLoadManagerOfDepartment = (manager: Employee) => ({
  type: COMPLETE_LOAD_MANAGER_OF_DEPARTMENT,
  manager,
});

const failLoadManagerOfDepartment = () => ({
  type: FAIL_LOAD_MANAGER_OF_DEPARTMENT,
});

// Async Actions
export const loadDepartments = () => (dispatch: Dispatch) => {
  dispatch(startLoadDepartments());
  const loadDepartmentsPromise = getAllDepartments();
  loadDepartmentsPromise
    .then((data) => dispatch(completeLoadDepartments(data)))
    .catch(() => dispatch(failLoadDepartments()));
  return loadDepartmentsPromise;
};

export const loadDepartment = (id: number) => (dispatch: Dispatch) => {
  dispatch(startLoadDepartment());
  const loadDepartmentPromise = getDepartmentById(id);
  loadDepartmentPromise
    .then((data) => dispatch(completeLoadDepartment(data)))
    .catch(() => dispatch(failLoadDepartment()));
  return loadDepartmentPromise;
};

export const loadManagerOfDepartment = (id: number) => (dispatch: Dispatch) => {
  dispatch(startLoadManagerOfDepartment());
  const loadManagerOfDepartmentPromise = getManagerOfDepartment(id);
  loadManagerOfDepartmentPromise
    .then((data) => dispatch(completeLoadManagerOfDepartment(data)))
    .catch(() => dispatch(failLoadManagerOfDepartment()));
  return loadManagerOfDepartmentPromise;
};

// Reducer
export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOAD_DEPARTMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        departments: action.departments,
      };
    case START_LOAD_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        department: action.department,
      };
    case START_LOAD_MANAGER_OF_DEPARTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case FAIL_LOAD_MANAGER_OF_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
      };
    case COMPLETE_LOAD_MANAGER_OF_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        manager: action.manager,
      };
    default:
      return state;
  }
};
