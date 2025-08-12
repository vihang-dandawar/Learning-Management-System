import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <h1 className="text-3xl font-semibold mb-10">Instructor Dashboard</h1>

            <div className="flex flex-col sm:flex-row gap-6">
               <button
              className="bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => navigate('/create-course')}
            >
              <i className="fas fa-plus-circle mr-2"></i> Create New Course
            </button>

               <button
              className="bg-green-700 hover:bg-green-800 px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => navigate('/instructor-getAllcourses')}
            >
              <i className="fas fa-book mr-2"></i> Show My Courses
            </button>


           

            </div>
        </div>
    );
}
