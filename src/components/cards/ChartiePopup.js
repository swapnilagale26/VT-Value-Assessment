import React, { useState } from "react";
import { Modal, Form, Button, Container, Row } from "react-bootstrap";
import './HomePageCard.css'

const ChartiePopup = ({ show, handleClose, listData, setSelectChar, setEnabled,setTotalSelecetdValues }) => {
  const [selectItem, setSelectItem] = useState({});
  const handleChange = (e) => {
    e.persist();
    setSelectItem({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectChar(selectItem);
    handleClose();
    setEnabled(true);
  };

  const renderRadioOptions = () => {
    return Object.keys(listData).map((key) => (
      <Form.Check
        value={listData[key]}
        type="radio"
        key={key}
        name={key}
        aria-label="radio 1"
        label={listData[key]}
        onChange={handleChange}
        checked={listData[key] === selectItem[key]}
      />
    ));
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <h6>Which do you feel is most characteristic of you?</h6>
          <p className="m-2">
            <Form.Group>
              {Object.keys(listData).length && renderRadioOptions()}
            </Form.Group>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Done
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};


function HandleMultiSelction({ show, handleClose, listData, setSelectChar, setEnabled ,setShowPopup,setTotalSelecetdValues}) {
  let obj = { "A": "lazziness", "B": "active", "c": "dule" };
  let [selectKey, setSelectKey] = useState(null);
  const handleSelection = (key) => {
    console.log(key)
    setSelectKey(key);
  };

  const handleSubmit = () => {
    if(!selectKey){
      console.log("please select value");
      return false;
   
    }
    setSelectChar({[selectKey]:listData[selectKey]});
    setEnabled(true);
    setShowPopup(false)

  };
  const handleBack = () => {
    setShowPopup(false)
    setEnabled(false);
    setTotalSelecetdValues()
  };


  return (
    <Container className="my-5 containnerClass mb-10" style={{ border: "2px solid #B28D94", backgroundColor: '#fffaf6' }}>
      <Row >
        <div className="col-12 p-0">
          <h4
            className="fw-bolder mb-2  mt-0 p-3 text-center  tybreakertitle"
            style={{ letterSpacing: "1px", color: '#blsck', width: '100%' }}
          >
            Out of the characteristic below, which one resonates with you the most?
          </h4>
          <div className="d-flex align-items-center  flex-column justify-content-center">
            {Object.keys(listData).map((key) => {
              return <div
                className={`${selectKey == key ? 'isSelected ' : 'notSelected'} divButton text-center tybreakeroption`}
                style={{ width: '50%', padding: "1%",marginBottom: '12px',border: "2px solid #B28D94" }}
                onClick={() => { handleSelection(key) }}
              >
                {listData[key]}
              </div>
            })}
            <div className="d-flex align-items-center  flex-row justify-content-center" style={{width:'50%', marginBottom:'10%'}}>
        {/* <Button type="button" onClick={handleBack}>
              Back
            </Button> */}
            <Button type="button" onClick={handleSubmit} style={{width:'40%', fontSize:'1rem', marginTop:'7%'}}>
              NEXT
            </Button>
            </div>
          </div>
        </div>
      </Row>

    </Container>
  );

}

export { HandleMultiSelction }
export default ChartiePopup;



