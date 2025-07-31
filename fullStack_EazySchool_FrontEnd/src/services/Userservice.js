// src/services/Userservice.js

import api from './axiosConfig';
import axios from 'axios';

// ✅ Username-related (GET)
export const GetUsername = () => {
  return api.get('/api/username'); // token auto-injected
};

// ✅ Send contact form message (POST)
export const sendMessage = (formData) => {
  return api.post('/saveMsg', formData); // token auto-injected
};

// ✅ Login: returns JWT and role
export const validateCredentials = ({ email, password }) => {
  return api.post('/loginUser', { email, password });
};

// ✅ Register new user
export const RegisterNewUser = (userData) => {
  return api.post('/register', userData);
};

// ✅ Get all messages (Admin use)
export const getMessages = () => {
  return api.get('/allMessages'); // token auto-injected
};

export const CreateCourse=(form)=>{
  return api.post("/createCourse",form);
}

export const GetAllCourses=()=>{
  return api.get("/getAllCourses")
}


export const GetCourseById=(id)=>{
return api.get(`/all/courses/getCourseById/${id}`)
}

export const addVideosToCourse=(id,video)=>{
  return api.post(`courses/${id}/videos`,video);
}


export const updateCourse=(id,course)=>
{
  return api.put(`courses/updateInfo/${id}`,course);
}

export const deleteCourse=(id)=>
{
  return api.delete(`courses/deleteCourse/${id}`)
}



export const getVideoDetailsById=(id)=>
{
  return api.get(`/courses/video/GetInfo/${id}`);
}

export const updatevideoInfo=(id,video)=>
{
  return api.put(`/courses/video/updateInfo/${id}`,video)
}


export const DeleteVideo=(id)=>
{
return api.delete(`/courses/video/deleteVideo/${id}`);
}



export const getVideoLink=(id)=>{
return api.get(`/videos/getLink/${id}`)
}

export const sendOTP=(email)=>
{
return axios.post("http://localhost:1011/auth/send-otp",{email})
}

export const resetPasswordWithOTP=({email,otp,password})=>{
return axios.post("http://localhost:1011/auth/reset-password",{email,otp,password});
}




export const BuyCourse=(PaymentOrderRequest)=>
{
 return api.post("/api/payments/create-order",PaymentOrderRequest)
}






// export const isCoursePurchasedByUser = (courseId) => {
//   const token = localStorage.getItem('token');
//   return axios.get(`http://localhost:1011/purchase/check?courseId=${courseId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


export const isCoursePurchasedByUser = (courseId) => {
  return api.get(`/isCoursePurchased?courseId=${courseId}`);
};



export const CoursePurchase=(CoursePurchaseRequest)=>
{
  return api.post("/api/course-purchase",CoursePurchaseRequest)
}





