import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";
import LoadingPage from "../loading/LoadingPage";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ProfilePage = () => {
  const navigate = useNavigate();

  const {
    employee,
    manager,
    isLoading: isLoadingEmployees,
  } = useSelector((state: any) => state.employees);
  const { department, isLoading: isLoadingDepartments } = useSelector(
    (state: any) => state.departments
  );

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      {isLoadingDepartments || isLoadingEmployees ? (
        <LoadingPage />
      ) : (
        <div className="container">
          <button
            className="btn btn-dark mt-4"
            onClick={() => handleNavigate()}
          >
            Back
          </button>
          <div className="card profileCard" style={{ position: "absolute" }}>
            <div className="card-body">
              <h5
                className="card-title mb-4"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {employee.name}
              </h5>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item px-0">
                  <span className="infoLabel">Email:</span> {employee.email}
                </li>
                <li className="list-group-item px-0">
                  <span className="infoLabel">Username:</span>{" "}
                  {employee.username}
                </li>
                <li className="list-group-item px-0">
                  <span className="infoLabel">Manager:</span>{" "}
                  {manager?.name || "N/A"}
                </li>
                <li className="list-group-item px-0">
                  <span className="infoLabel">Department:</span>{" "}
                  {department?.description || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProfilePage;
