import React, { useState } from "react";
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap";

const TopBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="/">Your App</Navbar.Brand> */}
      <Nav className="ml-auto">
        <Image
          src="profile-image.jpg" // Replace with your profile image URL
          alt="Profile"
          roundedCircle
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
        />
        <NavDropdown
          show={showDropdown}
          title="Profile"
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#edit-profile">Edit Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default TopBar;
