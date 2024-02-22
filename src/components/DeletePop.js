import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from '../service/authenticator';
import { toast } from "react-toastify";

const DeletePop = ({ setDeleteUser, showModal,deleteUserdata,pageRowCount,fetchData,fetchAllUser}) => {
    // on click cancel button
    const onCancel = () => {
        setDeleteUser(null);
    };

    // on click conform  button
    const onConform = async () => {
        let result = await deleteUser({email:deleteUserdata.email});
        if(result){
            toast.success("User Delete Successfully");
            setDeleteUser(null);
            fetchData(0,pageRowCount);
            fetchAllUser(0,"All");
        }
        else{
            toast.error("User not Delete");
        }

    }
    return (
        <Modal  show={showModal} onHide={oncancel}>
            <Modal.Header className='thBackgroundcolor d-flex flex-row justify-content-enter align-item-center'>
                <Modal.Title >Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="trBackgroundcolor" >Are you sure you want to Delete the User ?</Modal.Body>
            <Modal.Footer className='d-flex flex-row justify-content-between  align-items-center !important' style={{width:'100%',backgroundColor:'#fffaf6'}}>
            <Button
              className=""
              style={{ backgroundColor: "#332d2d" }}
              type="button"
              onClick={onCancel}
            >
                Cancel
            </Button>
                <Button
              className=""
              style={{ backgroundColor: "#332d2d" }}
              type="button"
              onClick={onConform}

            >
                Delete
            </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default DeletePop;