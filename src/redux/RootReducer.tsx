import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as employeesReducer } from "./ducks/employeeDucks";
import { reducer as departmentsReducer } from "./ducks/departmentDucks";
import { reducer as userReducer } from "./ducks/user";

export const rootReducer = combineReducers({
  employees: employeesReducer,
  departments: departmentsReducer,
  form: formReducer,
  user: userReducer,
});
