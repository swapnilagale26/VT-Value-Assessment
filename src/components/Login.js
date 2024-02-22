import React, { useState ,useContext } from "react";
import { Row, Container, Card, Button } from "react-bootstrap";
import { userLogin } from "../service/authenticator";
import SignUpForm from "./SignUp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contex/UserContext";
import { userCreate } from "../service/authenticator";
import './login.css';
import { signInProvider } from "../contex/ArctypeProvider";

const Login = () => {
  const{isSignin,setIsSignIn}=useContext(signInProvider);
  const [loginForm, setLoginForm] = useState({});
  const [openSignupForm, setOpenSignupForm] = useState(false);

  const { setUserName } = useUserContext();
  const history = useNavigate();

  const handleFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!isSignin) {
      if(loginForm.email===loginForm.conformEmail){
        let emailvalidDate = (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/).test(loginForm.email);
       if(!emailvalidDate){
        return  toast.error("Please enter valid email address");
       }

    }
    else{
     return  toast.error("Both email is not matching");
    }
      try {
        let {data}=await userCreate(loginForm);
        setUserName({
          username: data.username,
          email: data.email,
        });
        setIsSignIn(!isSignin);
        localStorage.setItem('token', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', data.id);


        toast.success("User Created Successfully");
        history("/dashboard");
        
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setOpenSignupForm(false);
      }
    }
    else {
      try {
        const { data } = await userLogin(loginForm);
        setUserName({
          username: data.username,
          email: data.email,
        });
        setIsSignIn(!isSignin);
        localStorage.setItem('token', data.username);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id', data.id);

        history("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const openRegisterForm = () => {
    setIsSignIn(!isSignin)
  };
  
  const closeSignUpForm = () => {
    setOpenSignupForm(false);
  };

  return (
    <Container className="containnerClass" style={{border:"2px solid #B28D94",backgroundColor:'#fffaf6'}}>

      <Row >
        
        <div className="col-12 p-0">
        <h4
              className="fw-bold mb-2  mt-0 p-3"
              style={{ letterSpacing: "1px",textAlign:'center', fontWeight:800,backgroundColor:"#B28D94",color:'#fffaf6',width:'100%'}}
            >
            {!isSignin?"Please Provide Your Details Below and Proceed to the Assessment":"Login Form"}
            </h4>
          <form className="d-flex flex-column" onSubmit={handleLogin} style={{marginInline:'15%',marginTop:"5%"}} >

            {!isSignin ? (
              <>
                <label htmlFor="myInput" className="fw-bold" style={{color:"#B28D94"}}>Full Name</label>
                <input
                  className="mb-4 p-2 rounded"
                  placeholder="Full Name"
                  type="username"
                  name="username"
                  onChange={handleFormChange}
                  style={{border:'0px'}} />
                  
              </>
            ) : null}

            <label htmlFor="myInput" className="fw-bold" style={{color:"#B28D94"}}>Email Address</label>
            <input
              className="mb-4 p-2 rounded"
              placeholder="Email address"
              type="email"
              name="email"
              onChange={handleFormChange}
              style={{border:'0px'}}
            />
            {!isSignin ? (
              <>
                <label htmlFor="myInput" className="fw-bold" style={{color:"#B28D94"}}>Confirm Email Address</label>
                <input
                  className="mb-4 p-2 rounded"
                  placeholder="Email address"
                  type="email"
                  name="conformEmail"
                  onChange={handleFormChange}
                  style={{border:'0px'}}
                />
              </>
            ) : null}
            <label htmlFor="myInput" className="fw-bold" style={{color:"#B28D94"}}>Password</label>
            <input
              className="mb-4 p-2 rounded"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleFormChange}
              style={{border:'0px'}}
            />
            <Button
              className="mb-4 px-5"
              style={{ backgroundColor: "#332d2d" }}
              type="submit"

            >
              {isSignin ? "Login" : 'Signup'}
            </Button>
          
            <div className="d-flex flex-column justify-content-center align-item-center">
              <div>
            <a className="small text-muted cursor-pointer" style={{ cursor: 'pointer' }} onClick={()=>{history("/forgetPass/email/expire")}}>
              Forgot password?
            </a>
            </div>
            <div>
            <p className="mb-5 pb-lg-2 textsize" style={{ color: "rgba(33, 37, 41, 0.75)"}} >
              {isSignin ? "Don't have an account?" : "Already Registered ?"}
              <a
                style={{ color: "rgba(33, 37, 41, 0.75)", cursor: 'pointer' }}
                onClick={openRegisterForm}
                className='cursor-pointer'
              >
                {isSignin ? " Register here" : " Sign In Now"}
              </a>
            </p>
            </div>
            </div>
            {/* <div className="d-flex flex-row justify-content-center textsize" style={{marginBottom:'6%'}}>
              <a href="#!" className="small text-muted me-1">
                Terms of use.
              </a>
              <a href="#!" className="small text-muted">
                Privacy policy
              </a>
            </div> */}

          </form>
        </div>
      </Row>

    </Container>
  );
};
export default Login;
