import { useSelector } from "react-redux";
import { Department, Employee } from "../../utils/interfacesAndTypes";
import LoadingPage from "../loading/LoadingPage";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const { employees, isLoading: isLoadingEmployees } = useSelector(
    (state: any) => state.employees
  );
  const { departments, isLoading: isLoadingDepartments } = useSelector(
    (state: any) => state.departments
  );

  return (
    <>
      <Header />
      {isLoadingEmployees || isLoadingDepartments ? (
        <LoadingPage />
      ) : (
        <div className="container">
          <div className="d-flex justify-content-between mt-5">
            <ul
              className="list-group employeeList"
              style={{ maxHeight: "560px", overflow: "auto" }}
            >
              <li
                className="list-group-item active list-group-item-dark"
                aria-current="true"
              >
                Company Employees
              </li>
              {employees.map((employee: Employee, index: any) => {
                return (
                  <li className="list-group-item " key={index}>
                    <div className="d-flex">
                      {" "}
                      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {employee.name}
                      </div>
                      {!!employee.username && (
                        <div className="ms-3" style={{ fontWeight: "500" }}>
                          {`Known as ${employee.username}` ||
                            "No username available"}
                        </div>
                      )}
                    </div>
                    <span
                      className="me-1"
                      style={{ fontWeight: "500", fontSize: "17px" }}
                    >
                      Contact:
                    </span>
                    <span className="me-4">{employee.email}</span>
                    <span
                      className="me-1"
                      style={{ fontWeight: "500", fontSize: "17px" }}
                    >
                      Manager:
                    </span>
                    <span className="me-4">
                      {employees.filter(
                        (e: Employee) => e.id === employee.managerID
                      )[0]?.name || "N/A"}
                    </span>
                    <span
                      className="me-1"
                      style={{ fontWeight: "500", fontSize: "17px" }}
                    >
                      Department:
                    </span>
                    <span>
                      {departments.filter(
                        (d: Department) =>
                          d.departmentID === employee.departmentID
                      )[0]?.description || "N/A"}
                    </span>
                  </li>
                );
              })}
            </ul>

            <ul
              className="list-group departmentsList "
              style={{ maxHeight: "560px", overflow: "auto" }}
            >
              <li
                className="list-group-item active list-group-item-dark"
                aria-current="true"
              >
                Company Departments
              </li>
              {departments.map((department: Department) => {
                return (
                  <li className="list-group-item ">
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {department.description}
                    </div>
                    <span
                      className="me-1"
                      style={{ fontWeight: "500", fontSize: "17px" }}
                    >
                      Manager:
                    </span>
                    <span className="me-4">
                      {employees.filter(
                        (e: Employee) => e.id === department.managerID
                      )[0]?.name || "N/A"}
                    </span>
                    <span
                      className="me-1"
                      style={{ fontWeight: "500", fontSize: "17px" }}
                    >
                      Department size:
                    </span>
                    <span className="me-4">
                      {employees.filter(
                        (e: Employee) =>
                          e.departmentID === department.departmentID
                      ).length || "0"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
