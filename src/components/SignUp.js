import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';
import { userCreate } from "../service/authenticator";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ closeForm, show, setOpenSignupForm}) => {
    const [form, setForm] = useState({});
    const history = useNavigate();

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        try {
          await userCreate(form);
          toast.success("User Created Successfully");
          setOpenSignupForm(false);
          history("/learn");
        } catch (err) {
          console.log(err);
          toast.error(err?.response?.data?.message);
          setOpenSignupForm(false);
        }
      };
    

    return (
        <Modal show={show} onHide={closeForm} size="md" className='p-5'>
            <Modal.Header closeButton>
                <Modal.Title>Sign into your account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='d-flex flex-column' onSubmit={handleSubmitSignUp}>
                    {/* <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }} ></h5> */}
                    <input className='mb-4 p-2 rounded' placeholder='User Name' type='text' name="username" onChange={handleFormChange} />
                    <input className='mb-4 p-2 rounded' placeholder='Email address' type='email' name="email" onChange={handleFormChange} />
                    <input className='mb-4 p-2 rounded' placeholder='Password' type='password' name="password" onChange={handleFormChange} />
                    <input className='mb-4 p-2 rounded' placeholder='Mobile Number' type='tel' name="mobile" onChange={handleFormChange} />
                    <input className='mb-4 p-2 rounded' placeholder='Address' type='text' name="address" onChange={handleFormChange} />
                    <Button type="submit">Sign Up</Button>
                </form>
            </Modal.Body>
        </Modal>

    )
}

export default SignUpForm;