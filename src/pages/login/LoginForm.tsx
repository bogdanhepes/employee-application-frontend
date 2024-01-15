import React, { useState } from "react";
import { reduxForm, InjectedFormProps, Field } from "redux-form";
import {
  CheckInputComponent,
  UsernameInputComponent,
  PasswordInputComponent,
} from "../../components/customFields/CustomFields";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export interface LoginFormValues {
  username: string;
  password: string;
  checked: boolean;
}

const validate = (values: any) => {
  const errors: any = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValues, LoginFormProps> & LoginFormProps
> = (props) => {
  const { handleSubmit, error } = props;

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: " 2px solid #6c757d",
        borderRadius: "12px",
        padding: "30px 20px",
        boxShadow: "0px 0px 35px 15px rgb(188, 188, 188)",
        backgroundColor: "#f8f9fa",
        width: "500px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h3>Log In</h3>
      <Field name="username" component={UsernameInputComponent} type="text" />
      <Field
        name="password"
        component={PasswordInputComponent}
        type="password"
      />
      {error && <div>{error}</div>}
      <Field
        name="checked"
        component={CheckInputComponent}
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(!checked)
        }
      />
      <div>
        <button className="btn btn-dark mt-2 w-100" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default reduxForm<LoginFormValues, LoginFormProps>({
  form: "loginForm",
  validate,
})(LoginForm);
