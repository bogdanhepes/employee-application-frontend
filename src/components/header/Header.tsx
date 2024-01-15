import { Link } from "react-router-dom";
import { logout } from "../../redux/ducks/user";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployeeByUsername,
  loadEmployees,
  loadManager,
} from "../../redux/ducks/employeeDucks";
import {
  loadDepartment,
  loadDepartments,
} from "../../redux/ducks/departmentDucks";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { employee } = useSelector((state: any) => state.employees);
  useEffect(() => {
    loadDepartments()(dispatch);
    loadEmployees()(dispatch);

    if (
      !!localStorage.getItem("username") ||
      !!sessionStorage.getItem("username")
    ) {
      const username =
        localStorage.getItem("username") || sessionStorage.getItem("username");
      if (username) {
        loadEmployeeByUsername(username)(dispatch)
          .then(() => {
            loadManager(employee.managerID)(dispatch);
            loadDepartment(employee.departmentID)(dispatch);
          })
          .catch(() => {
            toast.error("There was an error getting user information!");
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <nav className="navbar bg-dark navbar-dark">
        <div className="container">
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className="navbar-brand">Employee Application</div>
          </Link>
          <form className="d-flex" role="search">
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              <button className="btn btn-outline-light me-3" type="submit">
                Profile
              </button>
            </Link>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <button
                className="btn btn-dark"
                type="submit"
                onClick={() => {
                  logout()(dispatch);
                  toast.success("User logged out successfully!");
                }}
              >
                Logout
              </button>
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
