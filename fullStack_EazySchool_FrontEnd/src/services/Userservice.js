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



export const changemsgStatus=(id)=>
{
  return api.get(`/changeStatus/${id}`)
}



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



export const getPurchasedCourses=()=>
{
  return api.get("/purchased-courses",)
}


export const CoursePurchase=(CoursePurchaseRequest)=>
{
  return api.post("/api/course-purchase",CoursePurchaseRequest)
}



export const latestCourses=()=>
{
   return axios.get("http://localhost:1011/courses/latest");
}



export const getCategoriesOfCourses=()=>
{
  return axios.get("http://localhost:1011/courses/getCategory")
}

export const searchCourse = (keyword) => {
  return axios.get(`http://localhost:1011/courses/search/${encodeURIComponent(keyword)}`);
}

export const getEnrolledStudentsByCourseId=(courseId)=>{
  return api.get(`http://localhost:1011/courses/${courseId}/students`)
}

export const InstructorApplicationForm = (form) => {
  return api.post(`/api/instructor-applications/apply`, form);
};

export const InstructorApprovalPending = () => {
  return api.get("/api/instructor-applications/pending");
};

export const InstructorApprovalStatusApprove = (id) => {
  return api.put(`/api/instructor-applications/${id}/approve`);
};

export const InstructorApprovalStatusReject = (id) => {
  return api.put(`/api/instructor-applications/${id}/reject`);
};


export const GetInstructorCourses=()=>{
  return api.get("/instructor/courses")
}




