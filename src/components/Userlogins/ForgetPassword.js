
import React,{useState,useRef,useContext, useEffect} from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import { forgetPassWordMail,forgetPasswordSave } from "../../service/authenticator";
import { signInProvider } from "../../contex/ArctypeProvider";
function ForgetPassWord() {
    let [forgetPass,setForgetPass]=useState(true);
    let [email,setEmail]=useState(null);
    let newpasswardRef = useRef(null);
     let confirmpasswardRef = useRef(null);
     let params=useParams();
     let history=useNavigate();

     // it is context which we basically use for  control sign in page is it sign in or sign up
     const{isSignin,setIsSignIn}=useContext(signInProvider);
       useEffect(()=>{
        if(params.email!='email'&&params.expire!="expire"){
          const now = new Date();
          let currentTimeStamp= now.getTime();
         console.log(parseFloat(params.expire)>=currentTimeStamp,parseFloat(params.expire),currentTimeStamp);
          if(parseFloat(params.expire)<=currentTimeStamp){
               setForgetPass(false);
               setEmail(params.email);
          }
          else{
              toast.error("link  is expired so please do process again ")
          }
  
       };

       },[]);
   
     const handleForgetPassword=async()=>{
        if(forgetPass){
          // api call for forget password mail link send
       let result =await forgetPassWordMail({email});
       if(!result.data.error){
        toast.success("link send to mail sucessfully ");
       }
       else{
        toast.error("mail is not found ");
       }
        }
        else{
            //api call for save password
            if (
              !newpasswardRef.current.value.trim() ||
              !confirmpasswardRef.current.value.trim()
            ) 
            {
              toast.error("for Changing password enter both password");
            }
             else if (
              newpasswardRef.current.value.trim() !=
              confirmpasswardRef.current.value.trim()
            ) {
              toast.error("new password  and confirm password is not maching");
            }
            else{
              let result=await forgetPasswordSave({email,newPassword:newpasswardRef.current.value});
              toast.success("password updates sucessfully");
              history("/signin");
              setIsSignIn(true);

            }
           
            
        }

     }
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
                    style={{ marginInline: "15%"}}
                  >
                    <div className="d-flex justify-content-center" >
                      <div
                        style={{ marginBottom: "5%",marginTop:'2%' }}
                        className="fw-bold heading"
                      >
                        <span class="span_css">Forget Password</span>
                      </div>
                   
                    </div>
                    {!forgetPass ?
                   ( <>

                      {/*<label
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
                        style={{ border: "0px" }}
                        disabled={true}
                   />*/}
                      
                     </>):null}
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
                      disabled={!forgetPass}
                    />
                    {!forgetPass ? (
                      <>
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
                          style={{ border: "0px" }}
                        />
                      </>
                    ) : null}
                    <div className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn btn-primary  mb-4 px-2"
                       onClick={handleForgetPassword}
                    >
                      {forgetPass?"Send Email":" save passowrd"}
                    </Button>
                      
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
  )
}
export default ForgetPassWord;