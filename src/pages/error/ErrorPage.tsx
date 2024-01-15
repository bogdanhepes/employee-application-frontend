import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <span className="errorMessage">Aww snap... we ran into a problem.</span>
      <div className="tryAgainMessage">Please try again in a few minutes.</div>
    </>
  );
};

export default ErrorPage;
