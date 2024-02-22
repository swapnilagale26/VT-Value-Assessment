import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/common.scss";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useUserContext } from "../../contex/UserContext";
import { Navbar, Nav, Button, Container, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { getUserReport } from "../../service/authenticator";
import { serverUrl } from "../../Constant/ReportValue";
import { signInProvider } from "../../contex/ArctypeProvider";
import { useCol } from "react-bootstrap/esm/Col";
import image6 from "../img/Ventura-Logo.png";

const MyNavbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const username = localStorage.getItem('username');
  const [expanded, setExpanded] = useState(false);
  const { userName, setUserName } = useUserContext();
  const history = useNavigate();
  const{isSignin,setIsSignIn}=useContext(signInProvider);


  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [userName])

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserName({
      username: "",
      email: "",
    });

    history("/signin");
  };

  const handleReportDownload = async () => {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

    let result = await getUserReport({ email });
    let reportlist = (result.data[0].report);
    let url = (`${serverUrl}/uploads/${reportlist[reportlist.length - 1]}`);
    if (reportlist.length) {
      var oXHR = new XMLHttpRequest();
      oXHR.open("GET", url, true);
      oXHR.responseType = "blob";

      oXHR.onload = function (event) {
        var blob = oXHR.response;

        // Create a temporary anchor element to initiate the download
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);


        // Set the download attribute to specify the filename for the downloaded file
        link.setAttribute("download", `${username}_report.pdf`);

        // Trigger the click event on the anchor element
        link.click();

        // Clean up - revoke the object URL and remove the anchor element after the click event has been triggered
        URL.revokeObjectURL(link.href);
      };

      oXHR.send();
    }
    else {
      toast.error("Report are not available !...");
    }

  }

  const handleSign=()=>{
    history("/signin");
    setIsSignIn(true);
  }

  const assessmentClick=()=>{
    history("/signin");
    setIsSignIn(false);
  }

  const handleHomeClick=()=>{
    history("/home");
    setIsSignIn(true);
  }

  // function call on click profile
  const handleProfileClick=()=>{
    history("/profile");
  }

  return (
    // <nav className="navbar navbar-light bg-light">
    //   <div className="container">
    //     <a className="navbar-brand" href="/">
    //       <img
    //         src="https://www.venturatechnologies.in/public/assets/img/HomePage_4-30.png"
    //         alt="Logo"
    //         width="140"
    //         height="60"
    //         className="d-inline-block align-top"
    //       />
    //     </a>


    //     {token ? (
    //       <div>
    //         <Link className="btn btn-primary" onClick={handleLogout}>
    //           Logout
    //         </Link>
    //         <Button className="btn btn-primary" onClick={handleLogout}>
    //           Logout
    //         </Button>
    //         <UserProfile />
    //       </div>
    //     ) : (
    //       <div>

    //       <a className="btn btn-primary" href="/signin">
    //         Sign In
    //       </a>
    //       </div>
    //     )}



    //   </div>
    // </nav>

    <Navbar  expand="lg" >
      <Container>
        <Navbar.Brand onClick={handleHomeClick}>
          <img
            src={image6} // Replace with the path to your logo
            alt="Logo"
            width="112"
            height="50"
            style={{cursor: 'pointer'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
          <Nav className="ms-auto">
            <Nav.Link className="navlinks"
              onClick={assessmentClick} >AstroValues Alignment</Nav.Link>
            <Nav.Link href="#link2" className="navlinks" disabled>AstroStrength Analysis</Nav.Link>
            <Nav.Link href="#link3" className="navlinks" disabled>AstroLeadership Archetype</Nav.Link>
            {token ? <NavDropdown title={username} id="basic-nav-dropdown p-0" >
              <NavDropdown.Item   style={{ backgroundColor: '#fffaf6' }} onClick={handleProfileClick}>Profile</NavDropdown.Item>
              <NavDropdown.Item href=""  style={{ backgroundColor: '#fffaf6' }} onClick={handleReportDownload}> Report</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={handleLogout} style={{ backgroundColor: '#fffaf6' }}>logout</NavDropdown.Item>
            </NavDropdown> : (
            <div>
              <a className="btn btn-secondary" style={{ backgroundColor: '#fffaf6' }} onClick={handleSign}>
               { !isSignin?"Login":"Login"}
              </a>
            </div>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
