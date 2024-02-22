import React, { useEffect, useState } from "react";
import { getAllUserDetails, getUserCount } from "../service/authenticator";
import { Table, Card, Row, Button } from "react-bootstrap";
import { serverUrl } from "../Constant/ReportValue";
import { toast } from "react-toastify";
import DeletePop from "./DeletePop";
import { CSVLink } from "react-csv";

import image2 from "../components/img/secondImage.png";
import image3 from "../components/img/thirdImage.png";
import { FaPencilAlt, FaArrowCircleDown } from "react-icons/fa";
import {
  MdDelete,
  MdArrowBackIos,
  MdFastForward,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { AiOutlineBackward } from "react-icons/ai";
import "../components/banner.scss";
import Form from "react-bootstrap/Form";
import "./Report.css";

export default function UserDetails() {
  let [userDetails, setUserDetails] = useState(null);
  let [deleteUserdata, setDeleteUser] = useState(null);
  const [assessmentDetail, setAssessmentDetails] = useState(null); // it actually store for which assessment we showing result like it astorvalues , astrostrength,astroleadership
  let [pageNumber, setPageNumber] = useState(1); // current page no.
  let [count, setCount] = useState(null); // total no of rows
  let [pageRowCount, setPageRowCount] = useState(5); // no of row per page
   
  let [allUserDetails, setAllUserDetails]=useState(null);

  let headers = [
    { label: "Id", key: "Id" },
    { label: "username", key: "username" },
    { label: "email", key: "email" }
  ];

  useEffect(() => {
    {
      // Call the fetchData function
     //fetchData(0, pageRowCount);

    }
  }, []);


  useEffect(()=>{
    fetchAllUser(0,"All");

  },[])
  // get all user details
  // startIndex : means in array consist of all entry from which entry we want selection of element
  // endIndex: how many no. of element we want from array
  const fetchData = async (startIndex, endIndex) => {
    try {
      // Assuming getAllValue returns a promise
      const result = await getAllUserDetails({ startIndex, endIndex });
      const count = await getUserCount();
      setCount(count.data);
      // set data to state variable
      setUserDetails(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors if needed
    }
  };

  // fetch all users
  const fetchAllUser= async(startIndex, endIndex)=>{
    try {
      // Assuming getAllValue returns a promise
      const result = await getAllUserDetails({ startIndex, endIndex });
      let  countResult=result.data.map((ele,index)=>{
        ele.Id=index+1;
        delete ele._id;
        return ele

      })
      // set data to state variable
      setAllUserDetails(countResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  const handlePaginationClick = (button) => {
    if (button == "First") {
      setPageNumber(1);
      fetchData(0, pageRowCount);
    } else if (button == "Prev" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      fetchData(pageRowCount * (pageNumber - 2), pageRowCount);
    } else if (
      button == "Next" &&
      pageNumber < Math.ceil(count / pageRowCount)
    ) {
      setPageNumber(pageNumber + 1);
      fetchData(pageRowCount * pageNumber, pageRowCount);
    } else {
      setPageNumber(Math.ceil(count / pageRowCount));
      fetchData(
        pageRowCount * (Math.ceil(count / pageRowCount) - 1),
        pageRowCount
      );
    }
  };

  const downloadReport = (user) => {
    let reportlist = user?.report ?? [];
    if (reportlist.length) {
      let url = `${serverUrl}/uploads/${reportlist[reportlist.length - 1]}`;

      var oXHR = new XMLHttpRequest();
      oXHR.open("GET", url, true);
      oXHR.responseType = "blob";

      oXHR.onload = function (event) {
        var blob = oXHR.response;

        // Create a temporary anchor element to initiate the download
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the download attribute to specify the filename for the downloaded file
        link.setAttribute("download", `${user.username}_report.pdf`);

        // Trigger the click event on the anchor element
        link.click();

        // Clean up - revoke the object URL and remove the anchor element after the click event has been triggered
        URL.revokeObjectURL(link.href);
      };

      oXHR.send();
    } else {
      toast.error("Reports are not available !...");
    }
  };

  const deleteUser = (user) => {
    setDeleteUser(user);
  };

  return userDetails ? (
    <>
      <div style={{ paddingInline: "2%", borderTop: "0px" }}>
        {
          <div className="top_instructions">
            <h3 style={{ marginTop: "1rem" }} className="fw-bold">
              <span class="span_css">{` ${assessmentDetail}  User Details`}</span>{" "}
            </h3>
          </div>
        }

        <table className="table tableheading">
          <thead className="tableheading">
            <tr>
              <th style={{ color: "#fffaf6", backgroundColor: "#b28d94" }}>
                Sr No.
              </th>
              <th
                style={{ color: "#fffaf6", backgroundColor: "#b28d94" }}
                className="textAlignment"
              >
                Full Name
              </th>
              <th
                style={{ color: "#fffaf6", backgroundColor: "#b28d94" }}
                className="textAlignment"
              >
                Email
              </th>
              <th
                style={{ color: "#fffaf6", backgroundColor: "#b28d94" }}
                className="textAlignment"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((ele, index) => {
              return (
                <tr
                  style={{
                    backgroundColor: "#fffaf6",
                    borderBottom: "2px solid #b28d94",
                  }}
                >
                  <td>{pageRowCount * (pageNumber - 1) + (index + 1)}</td>
                  <td className="textAlignment">{ele.username}</td>
                  <td className="textAlignment">{ele.email}</td>
                  <td className="textAlignment">
                    {/* <button  className="trBackgroundcolor" onClick={() => { viewUser(ele) }}><FaPencilAlt /></button > */}
                    <button
                      className="paginationButton"
                      onClick={() => {
                        downloadReport(ele);
                      }}
                    >
                      <FaArrowCircleDown />
                    </button>
                    <button
                      className="paginationButton"
                      onClick={() => {
                        deleteUser(ele);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <DeletePop
          deleteUserdata={deleteUserdata}
          showModal={Boolean(deleteUserdata)}
          setDeleteUser={setDeleteUser}
          fetchData={fetchData}
          setPageNumber={setPageNumber}
          fetchAllUser={fetchAllUser}
          pageRowCount={pageRowCount}

        />
        <div
          className="d-flex flex-row d-flex justify-content-between  align-item-center"
          style={{
            marginBottom: "2%",
            border: "2px solid #b28d94",
            borderTop: "0px",
            padding: "0.5%",
          }}
        >
          <RowSelect
            setPageRowCount={setPageRowCount}
            fetchData={fetchData}
            setPageNumber={setPageNumber}
            pageRowCount={pageRowCount}
          />
          <PageNoSelection
            pageRowCount={pageRowCount}
            count={count}
            fetchData={fetchData}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
          <PagePagination
            handlePaginationClick={handlePaginationClick}
            pageNumber={pageNumber}
            pageRowCount={pageRowCount}
            count={count}
          />
        </div>
        <CSVLink data={allUserDetails} headers={headers}><button className="btn btn-primary mb-1" >Download List</button>
        </CSVLink>
      </div>
    </>
  ) : (
    <>
      <div className="top_instructions">
        <h3 style={{ marginTop: "1rem" }} className="fw-bold">
          <span className="span_css">User Details</span>{" "}
        </h3>
      </div>
      <Row className="justify-content-center align-item-center mx-1 mb-3 mt-1">
        <CardList
          fetchData={fetchData}
          pageRowCount={pageRowCount}
          setAssessmentDetails={setAssessmentDetails}
        />
      </Row>
    </>
  );
}

//  backward forward move in pages
function PagePagination({
  handlePaginationClick,
  pageNumber,
  count,
  pageRowCount,
}) {
  return (
    <div
      className="d-flex flex-row d-flex justify-content-around"
      style={{ width: "20%", alignItems: "center" }}
    >
      <button
        className="paginationButton"
        onClick={() => {
          handlePaginationClick("First");
        }}
      >
        <AiOutlineBackward />
      </button>
      <button
        className="paginationButton"
        onClick={() => {
          handlePaginationClick("Prev");
        }}
      >
        <MdArrowBackIos />
      </button>
      <label
        className="fw-bold"
        style={{ color: "#B28D94" }}
      >{`page[${pageNumber}] of [${Math.ceil(count / pageRowCount)}]`}</label>

      {/* <div style={{ color: "#B28D94" }}>{`page[${pageNumber}] of [${Math.ceil(count / pageRowCount)}]`}</div> */}
      <button
        className="paginationButton"
        onClick={() => {
          handlePaginationClick("Next");
        }}
      >
        <MdOutlineArrowForwardIos />
      </button>
      <button
        className="paginationButton"
        onClick={() => {
          handlePaginationClick("Last");
        }}
      >
        <MdFastForward />
      </button>
    </div>
  );
}

// select particular page of total available page
function PageNoSelection({
  pageRowCount,
  count,
  fetchData,
  setPageNumber,
  pageNumber,
}) {
  const handleSelectChange = (OEvent) => {
    setPageNumber(+OEvent.target.value);
    fetchData(pageRowCount * (+OEvent.target.value - 1), pageRowCount);
  };
  let length = Math.ceil(count / pageRowCount);
  return (
    <div
      className="d-flex flex-row justify-content-center"
      style={{ alignItems: "center" }}
    >
      <label className="fw-bold" style={{ color: "#B28D94" }}>
        Page:
      </label>
      <Form.Select
        size="sm"
        style={{ width: "80%" }}
        onChange={handleSelectChange}
        value={pageNumber}
      >
        {Array(length)
          .fill(1)
          .map((ele, index) => {
            return (
              <option
                value={index + 1}
                key={index + 1}
                className="fw-bold"
                style={{ color: "#B28D94" }}
              >
                {index + 1}
              </option>
            );
          })}
      </Form.Select>
    </div>
  );
}

//  handle select Record per page selection
function RowSelect({
  setPageRowCount,
  fetchData,
  setPageNumber,
  pageRowCount,
}) {
  const handleRowselection = (oEvent) => {
    //  if(typeof(oEvent.target.value)=="number" && oEvent.target.value >=1){
    setPageNumber(1);
    setPageRowCount(+oEvent.target.value);
    fetchData(0, +oEvent.target.value);
    //  }
  };
  return (
    <div
      className="d-flex flex-row justify-content-center align-item-center"
      style={{ alignItems: "center" }}
    >
      <div className="fw-bold" style={{ color: "#B28D94" }}>
        Records Per Page:
      </div>
      <Form.Select
        size="sm"
        style={{ width: "40%", padding: "2%" }}
        onChange={handleRowselection}
        value={pageRowCount}
      >
        {[5, 10, 25, 50].map((ele, index) => {
          return (
            <option
              value={ele}
              key={index + 1}
              className="fw-bold"
              style={{ color: "#B28D94" }}
            >
              {ele}
            </option>
          );
        })}
      </Form.Select>
      {/* </div> */}
    </div>
  );
}

// it return list on card for astrovalue, astrostrength,astroleadership
function CardList({ fetchData, setAssessmentDetails, pageRowCount }) {
  const handleClick = (title) => {
    if (title == "AstroValues Alignment") {
      fetchData(0, pageRowCount);
      setAssessmentDetails("AstroValues");
    } else if (title == "AstroStrength Analysis") {
      fetchData(0, pageRowCount);
      setAssessmentDetails("AstroStrength");
    } else {
      fetchData(0, pageRowCount);
      setAssessmentDetails("AstroLeadership");
    }
  };

  return [
    {
      title:"AstroValues Alignment",
      buttonText: "AstroValues",
      image:"./firstImage.png"
    },
    {
      title:"AstroStrength Analysis",
      buttonText: "AstroStrength",
      image:"./secondImage.png"
    },
    {
      title:"AstroLeadership",
      buttonText: "AstroLeadership",
      image:"./thirdImage.png"
    },
  ].map((ele, index) => {
    return (
      <>
        <Card
          key={index}
          className={`card-warpper mx-1 mb-3  col-md-3`}
          // onClick={() => handleCard(item, isSelectedItem)}

          style={{
           height: "197px",
            // width: "337px",
            backgroundImage: `url(${ele.image})`,
            backgroundSize: 'cover',
                backgroundPosition: 'center',
          }}
        >
          <Card.Body
            className="d-flex align-items-center  p-0 "
            style={{ marginTop: "1rem", height: "100%", flexDirection:'column' }}
          >
            <div
              className={`d-flex align-items-center  flex-column`}
              style={{
                border: "2px soild red",
                opacity: "1",
                color: "white",
                width: "100%",
                height: "100%",
                zIndex: "3",
                justifyContent: "flex-end",
              }}
            >
              {/* <div
                className=" mb-1 top_instructions"
                style={{
                  lineHeight: "1.3",
                  //  fontSize:'1.7rem',

                  color: "black",
                }}
              >
                {ele.title}
              </div> */}
              {/* <div
                className=" px-1"
                style={{
                  maxWidth: "100%",
                  textAlign: "center",
                  lineHeight: "1.2",
                }}
              >
                {ele.title}
              </div> */}
              <div>
                <Button
                  type="button"
                  className="btn btn-primary  mb-4 px-2"
                  onClick={() => {
                    handleClick(ele.title);
                  }}
                >
                  {ele.buttonText}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  });
}
