import React from "react";
import { connect, useSelector } from "react-redux";

import LoginForm, { LoginFormValues } from "./LoginForm";
import { RootState } from "../../redux/Store";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/ducks/user";

interface LoginProps {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginPage: React.FC<LoginProps> = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values);
    isLoggedIn && navigate("/home");
  };
  (localStorage.getItem("username") || sessionStorage.getItem("username")) &&
    navigate("/home");

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  values: state.form.loginForm,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (values: LoginFormValues) =>
    loginUser(
      values.username,
      values.password
    )(dispatch)
      .then(() => {
        if (values.checked) {
          localStorage.setItem("username", values.username);
        }
      })
      .catch(() => {
        toast.error("Incorrect username and password combination!");
      }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
