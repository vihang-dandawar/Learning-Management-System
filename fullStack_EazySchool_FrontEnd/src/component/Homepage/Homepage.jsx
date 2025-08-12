import React, { useState, useEffect } from 'react';
import { latestCourses } from '../../services/Userservice';

function Homepage() {
  const [courses, setCourses] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);

  useEffect(() => {
    latestCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('Error fetching latest courses:'));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCourseIndex((prev) => (prev + 1) % courses.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [courses]);

  const handlePrevCourse = () => {
    setCourseIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const handleNextCourse = () => {
    setCourseIndex((prev) => (prev + 1) % courses.length);
  };

  return (
    <>
      {/* Latest Courses */}
     <section className="pt-28 pb-16 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] bg-cover bg-center bg-no-repeat relative">
  <div className="relative max-w-6xl mx-auto px-6 text-white">
    <h3 className="text-center text-4xl font-bold mb-10">Latest Courses</h3>
    {courses.length > 0 && (
      <div className="relative flex justify-center items-center">
        <div className="w-full max-w-5xl bg-[#0f0f0f] bg-opacity-95 bg-opacity-5 rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-700 p-4">
          {/* Image */}
          <div className="h-60 md:h-64 p-2 flex justify-center items-center">
            <img
              src={courses[courseIndex].imageUrl}
              alt={courses[courseIndex].title}
              className="w-full h-full object-cover rounded-md shadow-md border border-gray-700 max-h-60"
            />
          </div>

          {/* Text Content */}
          <div className="p-6 flex flex-col justify-center text-white space-y-2">
            <h5 className="text-2xl font-semibold">{courses[courseIndex].title}</h5>
            <p className="text-sm text-gray-400">
              <strong>Category:</strong> {courses[courseIndex].category}
            </p>
            <p className="text-sm text-gray-300">{courses[courseIndex].description}</p>
            <p className="text-sm text-gray-400">
              <strong>Instructor:</strong> {courses[courseIndex].instructorName}
            </p>
            <p className="text-lg font-semibold text-green-400">
              ₹{courses[courseIndex].price}
            </p>
            <a
              href={`/courses/${courses[courseIndex].id}`}
              className="inline-block mt-2 px-4 py-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-medium rounded shadow transition w-max"
            >
              View Course
            </a>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrevCourse}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextCourse}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    )}
  </div>
</section>


      {/* Features Section */}
     <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-14">
      <p className="uppercase text-sm text-indigo-300 tracking-wide">Platform Features</p>
      <h3 className="text-4xl font-bold">Empowering You with Smart LMS Tools</h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        ['fas fa-chalkboard-teacher', 'Interactive Learning', 'Live classes, quizzes, and video lectures to boost engagement.'],
        ['fas fa-laptop-code', 'Hands-On Projects', 'Real-world projects to build a strong portfolio.'],
        ['fas fa-certificate', 'Certifications', 'Earn certificates after completing each course.'],
        ['fas fa-lock', 'Secure Access', 'Role-based protected content and secure payment system.'],
      ].map(([icon, title, desc], i) => (
        <div key={i} className="bg-[#1e2a38] rounded-lg p-6 text-center shadow-md border border-gray-700 hover:shadow-lg transition">
          <div className="text-indigo-400 text-3xl mb-4">
            <i className={icon}></i>
          </div>
          <h5 className="text-xl font-semibold mb-2">{title}</h5>
          <p className="text-gray-300 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      {/* <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-4xl font-bold mb-12">Why Choose LearnPro</h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        ['fas fa-chalkboard-teacher', 'Top Instructors'],
        ['fas fa-certificate', 'Industry Certifications'],
        ['fas fa-thumbs-up', 'Student Satisfaction'],
        ['fas fa-wallet', 'Guaranteed Value'],
      ].map(([icon, title], i) => (
        <div
          key={i}
          className="bg-[#1e2a38] border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition text-center"
        >
          <div className="text-indigo-400 text-4xl mb-4">
            <i className={icon}></i>
          </div>
          <h5 className="text-lg font-semibold">{title}</h5>
        </div>
      ))}
    </div>
  </div>
</section> */}


      {/* Stats Section */}
    <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] text-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-4xl font-bold mb-12">Our Numbers Speak</h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        ['👩‍🎓', '1000+', 'Students Enrolled'],
        ['🎓', '10+', 'Expert Instructors'],
        ['📝', '100+', 'Courses Available'],
        ['🏆', '50+', 'Industry Partners'],
      ].map(([emoji, number, label], i) => (
        <div
          key={i}
          className="bg-[#1e2a38] border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">{emoji}</div>
          <div className="text-2xl font-bold mb-1 text-indigo-300">{number}</div>
          <p className="text-sm text-gray-300">{label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
}

export default Homepage;
