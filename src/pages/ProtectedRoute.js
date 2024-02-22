import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <>
      {/* <Route
        {...rest}
        render={(props) =>
          token ? <Component {...props} /> : <Navigate replace to="/login" />
        }
      ></Route> */}
    </>
  );
};

export default ProtectedRoute;
