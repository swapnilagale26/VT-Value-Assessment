import axios from "axios";
import { serverUrl } from "../Constant/ReportValue";


export const userCreate = async (loginBody) =>{
    const response = await axios.post(serverUrl+"/api/users/register", loginBody);
    return response;
}

export const userLogin = async (loginUser) =>{
    const response = await axios.post(serverUrl+"/api/users/login", loginUser);
    return response;
}

export const valueCreate = async (valueBody) =>{
    console.log(valueBody)
    const response = await axios.post(serverUrl+"/api/values/add", valueBody);
    return response;
}

// get all card details
export const getAllValue = async () =>{
    const response = await axios.get(serverUrl+"/api/values/getAllValue");
    return response;
}

// save user report on download  during report generation screen
export const saveUserReport=async (valueBody)=>{
    const response = await axios.post(serverUrl+"/api/values/reportSave", valueBody);
    return response;

}

// get user report details means  report array
export const getUserReport= async (valueBody)=>{
    const responce= await axios.get( serverUrl+"/api/users/userReport/"+valueBody.email);
    return responce;
}

// get all user details for admin dashboard according page number
export const getAllUserDetails= async (valueBody)=>{
    const responce= await axios.get( serverUrl+"/api/users/userDetails/"+valueBody.startIndex+"/"+valueBody.endIndex);
    return responce;
}

// delete  particular  user
export const deleteUser= async (valueBody)=>{
    const responce= await axios.post(serverUrl+"/api/users/userDelete/"+valueBody.email);
    return responce;
}


// get count of all user
export const getUserCount= async (valueBody)=>{
    const responce= await axios.get( serverUrl+"/api/users/userCount");
    return responce;
}

// get all card details
export const getBase64Image= async () =>{
    const response = await axios.get(serverUrl+"/api/values/Base64Image");
    return response;
}

// save Updated password
export const saveUpdatedPassowrd= async(body)=>{
    const response=await axios.post(serverUrl+"/api/users/updatePassword",body);
    return response;

}

// save updated email and username
export const saveDetails= async(body)=>{
    const response=await axios.post(serverUrl+"/api/users/updateDetail",body)
    return response;
}

// forget passward mail sending 
export const forgetPassWordMail=async(body)=>{
    const response= await axios.post(serverUrl+"/api/users/ForgetPassWordMail",body);
    return response;
}

// api call to save password  
export const  forgetPasswordSave=async(body)=>{
    const response= await axios.post(serverUrl+"/api/users/forgetPasswordSave",body);
    return response;
}

// api call to  pdf generated  
export const  generatePdf=async(body)=>{
    const response= await axios.post(serverUrl+"/api/users/generatePdfSave",body);
    return response;
}


