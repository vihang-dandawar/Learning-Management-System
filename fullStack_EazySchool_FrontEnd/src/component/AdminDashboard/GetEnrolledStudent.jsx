import React, { useEffect, useState } from 'react';
import { getEnrolledStudentsByCourseId } from '../../services/Userservice';
import { useParams } from 'react-router-dom';

const EnrolledStudents = () => {
    const {courseId}=useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // console.log(courseId)
        const response = await getEnrolledStudentsByCourseId(courseId);
        setStudents(response.data);
      } catch (error) {

        console.error('Error fetching enrolled students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Enrolled Students</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : students.length === 0 ? (
          <div className="text-center text-gray-400">No students enrolled yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-md">
              <thead className="bg-gray-800 text-left">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-700">Name</th>
                  <th className="py-3 px-4 border-b border-gray-700">Email</th>
                  <th className="py-3 px-4 border-b border-gray-700">Age</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-800 transition">
                    <td className="py-3 px-4 border-b border-gray-700">{student.fullName}</td>
                    <td className="py-3 px-4 border-b border-gray-700">{student.email}</td>
                    <td className="py-3 px-4 border-b border-gray-700">{student.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledStudents;
