import React, { useRef, useState } from "react";
import "./Profile.css";
import { Row, Container, Card, Button } from "react-bootstrap";
import { saveDetails, saveUpdatedPassowrd } from "../../service/authenticator";
import { toast } from "react-toastify";
import { useUserContext } from "../../contex/UserContext";
import { useParams } from "react-router-dom";

function Profile() {
  debugger;
  const handleFormChange = (e) => {};
  const [edit, setEdit] = useState(true);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [username, setUserName] = useState(localStorage.getItem("username"));
  const setUserNameContext = useUserContext().setUserName;
  const [email, setEmail] = useState(localStorage.getItem("email"));
  let oldpasswardRef = useRef(null);
  let newpasswardRef = useRef(null);
  let confirmpasswardRef = useRef(null);

  const updateProfile = async () => {
    if (updatePassword) {
      if (
        !oldpasswardRef.current.value.trim() ||
        !newpasswardRef.current.value.trim() ||
        !confirmpasswardRef.current.value.trim()
      ) {
        toast.error("for Changing password enter old ,new ,confirm password");
      } else if (
        newpasswardRef.current.value.trim() !=
        confirmpasswardRef.current.value.trim()
      ) {
        toast.error("new password  and confirm password is not maching");
      } else {
        let result = await saveUpdatedPassowrd({
          id: localStorage.getItem("id"),
          oldPassword: oldpasswardRef.current.value,
          newPassword: newpasswardRef.current.value,
        });
        if (!result.data.error) {
          setUpdatePassword(false);
           setEdit(true);
          toast.success("password Updated Successfully");
        } else {
          toast.error("old password is not matching");
        }
      }
    }

    if (edit) {
      if (email.trim() == null || username.trim() == null) {
        console.log("enter valide email and username");
      } else {
        let result = await saveDetails({
          email,
          username,
          oldEmail: localStorage.getItem("email"),
          id: localStorage.getItem("id"),
        });
        if (!result.data.error) {
          localStorage.setItem("username", username);
          setUserNameContext(username);
          localStorage.setItem("email", email);
          toast.success("User update Successfully");
        } else {
          toast.error(
            "Email is already registered so please use another mail."
          );
          setEmail(localStorage.getItem("email"));
          setUserName(localStorage.getItem("username"));
        }
      }
    }
    if (!updatePassword && !edit) {
      console.log("no data available to Update");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* <!-- Form START --> */}
            <form className="file-upload">
              <div className="row mb-5 gx-5">
                <div className="col-2"></div>

                {/* <!-- Contact detail --> */}
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div className="col-12 p-0">
                    <form
                      className="d-flex flex-column"
                      //   onSubmit={handleLogin}
                      style={{ marginInline: "15%" }}
                    >
                      <div className="d-flex justify-content-between">
                        <div
                          style={{ marginBottom: "5%", marginTop: "2%" }}
                          className="fw-bold heading"
                        >
                          <span class="span_css">Details</span>
                        </div>
                         
                         {/* edit botton */}
                        
                      </div>
                      {!updatePassword ? (
                        <>
                          <label
                            htmlFor="myInput"
                            className="fw-bold"
                            style={{ color: "#B28D94" }}
                          >
                            Full Name
                          </label>
                          <input
                            className="mb-4 p-2 rounded"
                            placeholder="Full Name"
                            type="username"
                            name="username"
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                            style={{ border: "0px" }}
                            // disabled={!edit}
                            value={username}
                          />

                          <label
                            htmlFor="myInput"
                            className="fw-bold"
                            style={{ color: "#B28D94" }}
                          >
                            Email Address
                          </label>
                          <input
                            className="mb-4 p-2 rounded"
                            placeholder="Email address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            style={{ border: "0px" }}
                            // disabled={!edit}
                          />
                        </>
                      ) : null}
                      {updatePassword ? (
                        <>
                          <label
                            htmlFor="myInput"
                            className="fw-bold"
                            style={{ color: "#B28D94" }}
                          >
                            Old Password
                          </label>
                          <input
                            ref={oldpasswardRef}
                            className="mb-4 p-2 rounded"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleFormChange}
                            style={{ border: "0px" }}
                          />
                          <label
                            htmlFor="myInput"
                            className="fw-bold"
                            style={{ color: "#B28D94" }}
                          >
                            New Password
                          </label>
                          <input
                            className="mb-4 p-2 rounded"
                            placeholder="Password"
                            type="password"
                            name="password"
                            ref={newpasswardRef}
                            onChange={handleFormChange}
                            style={{ border: "0px" }}
                          />
                          <label
                            htmlFor="myInput"
                            className="fw-bold"
                            style={{ color: "#B28D94" }}
                          >
                            Confirm Password
                          </label>
                          <input
                            className="mb-4 p-2 rounded"
                            ref={confirmpasswardRef}
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleFormChange}
                            style={{ border: "0px" }}
                          />
                        </>
                      ) : null}
                      <div className="d-flex justify-content-between">
                        <Button
                          type="button"
                          className="btn btn-primary  mb-4 px-2"
                          onClick={updateProfile}
                        >
                          Save 
                        </Button>
                        {updatePassword?(
                        <button
                          className=" px-2 mb-3"
                          style={{
                            backgroundColor: "#fffaf6",
                            border: "0px",
                          }}
                          type="button"
                          onClick={() => {
                            setEdit(!edit);
                            setUpdatePassword(false);
                          }}
                        >
                          {"Edit Details"}
                        </button>):
                         <button
                         className="mb-4 px-2"
                         type="button"
                         style={{
                           backgroundColor: "#fffaf6",
                           border: "0px",
                         }}
                         onClick={() => {
                           setUpdatePassword(!updatePassword);
                           setEdit(!edit);
                         }}
                       >
                         {!updatePassword?"Change Password":"change detail"}
                       </button>
}
                       
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
              {/* <!-- Row END --> */}
              {/* <!-- Row END -->
				<!-- button --> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
