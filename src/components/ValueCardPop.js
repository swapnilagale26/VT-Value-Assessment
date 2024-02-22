import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";



function ValueCardPop({showModal,setShowModal,cardsSelectionrequired}) {
    return (
            // to hide and show modal we pass   true  or false in show of  modal
        <Modal  show={showModal}  className="modalsize" style={{marginTop:'5vh'}}>
            <Modal.Header className='fw-bold heading d-flex flex-row  align-item-center' style={{padding:'4px'}}>
              <div style={{ marginLeft:'6%' }} className="fw-bold modalheading">
                <span class="span_css">Selection Complete</span>
              </div>
                <RxCross2  style={{marginRight:'3%'}} onClick={()=>{  setShowModal(false);}}/> 
            </Modal.Header>
            <div
                style={{ marginTop: ".5rem", marginInline: "6%" ,paddingBottom:'15px'}}
                className="fw-200 modaldiscription"
              >
                 You have already selected the 
                <span class="spandetail_css"> maximum allowed </span> number of{" "}
                <span class="spandetail_css">cards{`(${cardsSelectionrequired})`}. </span>To make changes,
                <span class="spandetail_css"> deselect a card </span>before selecting a new one.
              </div>

          

        </Modal>
    )
}
export default ValueCardPop


