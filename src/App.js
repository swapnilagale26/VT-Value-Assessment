import "./App.css";
import LoginPage from "./container/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ForgetPassWord from "./components/Userlogins/ForgetPassword";
import LearnerDashboard from "./components/LearnerDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import AdminPage from "./container/AdminPage";
import Profile from "./components/Userlogins/Profile";
import { useEffect, useState } from "react";
import { useUserContext } from "./contex/UserContext";
import ValueDataForm from "./components/ValueDataForm";
import UserDetails from "./components/Userdetails";


function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("");
  const { userName } = useUserContext();
  console.log(token, "asdas jjjj");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [userName]);

  return (
    <div className="App" style={{backgroundColor:'#fffaf6'}}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/allUserDetails" element={<UserDetails />} />

        <Route path="/" element={<Navigate replace to="/home" />} />

        <Route path="/profile" element={< Profile/>} />

        <Route path="/signin" element={token ? <Navigate replace to="/dashboard" /> : <LoginPage />} />
        <Route
          path="/dashboard"
          element={
            token ? (
              role === "admin" ? (
                // <ValueDataForm />
                 <UserDetails />
              ) : (
                <LearnerDashboard />
              )
            ) : (
              <Navigate replace to="/signin" />
            )
          }
        />
        <Route path="/forgetPass/:email/:expire" element={<ForgetPassWord/>} />
        <Route path="*" element={<Navigate to="/home" replace />} />


      </Routes>
      <ToastContainer />
    </div>
  );
}

// Navigate is basically concept of class base component in that for nevigaton we need to use it but for function base component  we their is useNevigate   hook in react 
// we prefered use it 
export default App;
