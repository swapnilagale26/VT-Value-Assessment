import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAllValue, valueCreate } from "../service/authenticator";
import { toast } from "react-toastify";
import axios from "axios";

// const ValueDataForm = () => {

//     const [ valueForm, setValueForm ] = useState({
//     name: '',
//     description: '',
//     planets: {
//     sun: 0,
//     moon: 0,
//     mercury: 0,
//     venus: 0,
//     },
//     });

//     const handleSubmitValueData = async (e) =>{

//         e.preventDefault();
//         try {
//          await  valueCreate(valueForm);
//          console.log(valueForm)
//          setValueForm({});
//           toast.success("Value Created Successfully");
//         } catch (err) {
//           console.log(err);
//           setValueForm({});
//           toast.error(err?.response?.data?.message)
//         }
//     }

//     const handleFormChange = (e) => {
//         e.preventDefault();
//         setValueForm({
//             ...valueForm,
//             [e.target.name]: e.target.value,
//         })
//     }

//     return (
//                 <form className='d-flex flex-column' onSubmit={handleSubmitValueData}>
//                     {/* <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }} ></h5> */}
//                     <input className='mb-4 p-2 rounded' placeholder='Value Name' type='text' name="valueName" onChange={handleFormChange} />
//                     <input className='mb-4 p-2 rounded' placeholder='Description' type='text' name="description" onChange={handleFormChange} />
//                     <input className='mb-4 p-2 rounded' placeholder='Sun' type='number' name="sun" onChange={handleFormChange} />

//                     <input className='mb-4 p-2 rounded' placeholder='Moon' type='number' name="moon" onChange={handleFormChange} />
//                     <input className='mb-4 p-2 rounded' placeholder='Mercury' type='number' name="mercury" onChange={handleFormChange} />
//                     <Button type="submit">Submit</Button>

//                 </form>
//     )
// }

// export default ValueDataForm;

// ValueDataForm.js

const ValueDataForm = () => {
  const url = "http://localhost:5000/uploads/logo.txt";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    reportDescription: "",
    archetypes: {
      sun: 0,
      moon: 0,
      mercury: 0,
      venus: 0,
      mars: 0,
      jupiter: 0,
      saturn: 0,
      chiron: 0,
      uranus: 0,
      neptune: 0,
      pluto: 0,
      eris: 0,
    },
  });

  const [previewImage, setpreviewImage] = useState(null);

  const [addFile, setAddFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArchetypeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      archetypes: {
        ...formData.archetypes,
        [name]: parseInt(value),
      },
    });
  };

  const handleImageChange = (e) => {
    {
      const filedownload = e.target.files[0];
      if (filedownload) {
        const reader = new FileReader();

        reader.onloadend = function () {
          // The result property contains the base64-encoded image data
          const base64ImageData = reader.result;
          console.log(base64ImageData);
        };

        reader.readAsDataURL(filedownload);
      }

      //  download functionality testing
      // {
      //   const pdfFileUrl = 'http://localhost:5000/uploads/1701003758976-482916007.txt';
      //   axios.get(pdfFileUrl, { responseType: 'arraybuffer' })
      //     .then(response => {
      //       // Convert the array buffer to a base64 string
      //       const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));

      //       // Now you can use the base64Data as needed
      //       let  url=(`data:image/jpeg;base64,${base64Data}`);
      //       // let  url=(`data:application/pdf;base64,${base64Data}`);

      //       var oXHR = new XMLHttpRequest();
      //       oXHR.open("GET",url, true);
      //       oXHR.responseType = "blob";

      //       oXHR.onload = function (event) {
      //         var blob = oXHR.response;

      //         // Create a temporary anchor element to initiate the download
      //         var link = document.createElement("a");
      //         link.href = URL.createObjectURL(blob);

      //         // Set the download attribute to specify the filename for the downloaded file
      //         link.setAttribute("download", 'document_name');

      //         // Trigger the click event on the anchor element
      //         link.click();

      //         // Clean up - revoke the object URL and remove the anchor element after the click event has been triggered
      //         URL.revokeObjectURL(link.href);
      //       };

      //       oXHR.send();
      //     })
      //     .catch(error => {
      //       console.error('Error fetching file:', error);
      //     });

      // }
    }

    const file = e.target.files;
    setAddFile(file);
  };

  const flattenObject = (obj, formData, parentKey = "") => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keyPath = parentKey ? `${parentKey}[${key}]` : key;

        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !(obj[key] instanceof File)
        ) {
          // If the current value is an object (not a File), recursively flatten it
          flattenObject(obj[key], formData, keyPath);
        } else if (obj[key] instanceof File) {
          // If the current value is a File, append it to FormData directly
          formData.append(keyPath, obj[key]);
        } else {
          // Append the key-value pair to FormData  for archetype  or we particular data of form have nested structure
          formData.append(keyPath, obj[key]);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileData = new FormData();
    fileData.append("image", addFile[0]);
    fileData.append("imageBase64", previewImage);

    flattenObject(formData, fileData);

    try {
      console.log([...fileData.entries()]);

      console.log(fileData, "formdata");
      await valueCreate(fileData);
      // setFormData({});
      toast.success("Value Created Successfully");
    } catch (err) {
      console.log(err);
      // setFormData({});
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Add a New Node</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label> Report Description:</label>
          <input
            type="text"
            name="reportDescription"
            value={formData.reportDescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Archetypes:</label>
          {Object.keys(formData.archetypes).map((archetype) => (
            <div key={archetype}>
              <label>{archetype}:</label>
              <input
                type="number"
                name={archetype}
                value={formData.archetypes[archetype]}
                onChange={handleArchetypeChange}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            multiple
          />
        </div>
        {/* <img src="http://localhost:5000/uploads/1701062738923-248998000.txt"></img> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ValueDataForm;
