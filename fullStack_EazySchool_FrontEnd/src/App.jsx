import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Homepage from './component/Homepage/Homepage';
import Courses from './component/explore/courses';
import Contact from './component/contactPage/Contact';
import LoginPage from './component/login/loginPage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import UserDashboard from './component/userDashBoard/UserDashBoard';
import AdminDashboard from './component/AdminDashboard/AdminDashboard';
import Register from './component/Register/Register';

import '@fortawesome/fontawesome-free/css/all.min.css';
import CourseForm from './component/Course/CourseForm';
import CourseList from './component/Course/CourseList';
import CourseDetails from './component/Course/CourseDetails';
import EditCourse from './component/Course/EditCourse';
import AddVideo from './component/Course/AddVideo';
import EditVideoInfo from './component/Course/EditVideoInfo';
import ForgetPassword from './component/login/forgetPassword';
import BuyCoursePage from './component/Payment/BuyCourse';


function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isSessionChecked, setIsSessionChecked] = useState(false); // ✅ new
  const [UserId,setUserId]=useState(0)

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated') === 'true';
    const role = sessionStorage.getItem('role') || '';
const userId = parseInt(sessionStorage.getItem('userId'), 10);
    setIsAuthenticated(auth);
    setUserRole(role);
    setUserId(userId)
    setIsSessionChecked(true); // ✅ session read complete
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    sessionStorage.clear();
    navigate('/login');
  };

  const PrivateRoute = ({ children, role }) => {
    if (!isSessionChecked) return null; // 🔁 wait until sessionStorage is checked

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (role && userRole !== role) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      <Header role={userRole} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {isSessionChecked ? ( // ⏳ wait until sessionStorage is loaded
        <Routes>
           <Route path="/" element={<Homepage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/buy/:courseId" element={<BuyCoursePage />} />
      <Route
  path="/courses/:courseId"
  element={
    <CourseDetails
      isAuthenticated={isAuthenticated}
      userRole={userRole}
      userId={UserId}
      
    />
  }
/>


          <Route path="/create-course" element={
            <PrivateRoute role="ADMIN"><CourseForm /></PrivateRoute>
          } />

          <Route path='/admin-getAllcourses'
          element={ <PrivateRoute role="ADMIN"><CourseList /></PrivateRoute>}/>


          
          


            <Route path="/courses/:id/edit" element=
            {<PrivateRoute role="ADMIN">
              <EditCourse 
              setIsAuthenticated={setIsAuthenticated} 
              setUserRole={setUserRole} />
            </PrivateRoute>} />

            <Route path="/courses/:id/add-video" element=
            {<PrivateRoute role="ADMIN">
              <AddVideo
              setIsAuthenticated={setIsAuthenticated} 
              setUserRole={setUserRole}  />
            </PrivateRoute>} />


             <Route path="/videos/updateInfo/:id" element={
            <PrivateRoute role="ADMIN"><EditVideoInfo  
             setIsAuthenticated={setIsAuthenticated} 
            setUserRole={setUserRole}  /></PrivateRoute>
          } />




          <Route path="/login" element={
            <LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } />
          <Route path="/register" element={
            <Register setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } />
          <Route path="/userDashboard" element={
            <PrivateRoute role="USER"><UserDashboard /></PrivateRoute>
          } />
          <Route path="/adminDashboard" element={
            <PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>
          } />
        </Routes>
      ) : (
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>🔄 Loading...</p>
        </div>
      )}

      <Footer />
    </>
  );
}
export default App
