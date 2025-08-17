import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  GetCourseById,
  DeleteVideo,
  getVideoLink,
  isCoursePurchasedByUser,
} from '../../services/Userservice';

function CourseDetails({ isAuthenticated, userRole, UserId }) {
  const [course, setCourse] = useState(null);
  const [videoUrls, setVideoUrls] = useState({});
  const [isPurchased, setIsPurchased] = useState(false);
  const [loadingPurchaseStatus, setLoadingPurchaseStatus] = useState(true);
  const [loadingCourse, setLoadingCourse] = useState(true);

  const userId = sessionStorage.getItem('userId');
  const currentUserId = userId || UserId;

  const { courseId } = useParams();
  const navigate = useNavigate();

  const normalizedRole = String(userRole || '').toLowerCase();
  const isInstructor = normalizedRole === 'instructor';
  const isAdmin = normalizedRole === 'admin';

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    if (course && course.instructor) {
      const isCourseOwner = isCourseOwnerCheck();
      if (isAuthenticated && !isAdmin && !isCourseOwner) {
        checkPurchaseStatus();
      } else {
        setIsPurchased(isCourseOwner);
        setLoadingPurchaseStatus(false);
      }
    } else {
      setLoadingPurchaseStatus(false);
    }
  }, [course, currentUserId, isAuthenticated, isInstructor, isAdmin]);

  const fetchCourseDetails = async () => {
    try {
      setLoadingCourse(true);
      const { data } = await GetCourseById(courseId);
      setCourse(data || {});
      if (data?.videos) {
        fetchVideoUrls(data.videos);
      }
    } catch (err) {
      console.error('Failed to load course details:');
    } finally {
      setLoadingCourse(false);
    }
  };

  const fetchVideoUrls = async (videos) => {
    try {
      const results = await Promise.all(
        videos.map(async (video) => {
          try {
            const res = await getVideoLink(video.id);
            return [video.id, res.data];
          } catch {
            return [video.id, null];
          }
        })
      );
      const urls = Object.fromEntries(results);
      setVideoUrls(urls);
    } catch (err) {
      console.error('Failed to fetch video URLs:');
    }
  };

  const checkPurchaseStatus = async () => {
    try {
      setLoadingPurchaseStatus(true);
      const { data } = await isCoursePurchasedByUser(courseId);
      setIsPurchased(!!data);
    } catch (err) {
      setIsPurchased(false);
      console.error('Error checking purchase status:');
    } finally {
      setLoadingPurchaseStatus(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await DeleteVideo(videoId);
      fetchCourseDetails();
    } catch (err) {
      console.error('Failed to delete video:');
    }
  };

  const handleBuyCourse = () => navigate(`/buy/${courseId}`);

  const isCourseOwnerCheck = () => {
    return (
      course &&
      course.instructor &&
      course.instructor.id &&
      (isInstructor || isAdmin) &&
      String(course.instructor.id) === String(currentUserId)
    );
  };

  const canViewVideos = () => {
    return isAdmin || isCourseOwnerCheck() || (isAuthenticated && isPurchased);
  };

  const shouldShowBuyButton = () => {
    const isCourseOwner = isCourseOwnerCheck();
    return isAuthenticated && !isAdmin && !isCourseOwner && !isPurchased;
  };

  const shouldShowInstructorActions = () => {
    return isCourseOwnerCheck();
  };

  const isAdminButNotOwner = () => {
    return isAdmin && !isCourseOwnerCheck();
  };

  if (loadingCourse || (isAuthenticated && loadingPurchaseStatus)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-300">
          <div className="animate-pulse">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-300">
          <div>Course not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-3 sm:px-4 py-6">
      <button
        className="mb-6 text-sm border border-gray-500 px-3 sm:px-4 py-2 rounded hover:bg-gray-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Back to Courses
      </button>

      {/* Course Header */}
   <div className="flex flex-col md:flex-row w-full max-w-full mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
  {/* Image */}
  <div className="w-full md:w-1/2 relative" style={{ paddingTop: '125%' }}>
    <img
      src={course.imageUrl}
      alt={course.title}
      className="absolute top-0 left-0 w-full h-full object-cover"
      onError={(e) => { e.target.src = '/api/placeholder/400/200'; }}
    />
  </div>

  {/* Text Section */}
  <div className="flex-1 min-w-0 flex flex-col justify-center px-2 sm:px-4 py-2 sm:py-4">
    <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 break-words">
      {course.title}
    </h2>
    <p className="text-gray-400 mb-2 text-xs sm:text-base">{course.description}</p>
    <p className="text-xs sm:text-sm mb-1">
      <span className="font-semibold text-white">🎓 Instructor:</span> {course.instructorName}
    </p>
    <p className="text-xs sm:text-sm mb-1">
      <span className="font-semibold text-white">📚 Category:</span> {course.category}
    </p>
    <p className="text-xs sm:text-sm mb-3">
      <span className="font-semibold text-white">💰 Price:</span> ₹{course.price}
    </p>

    {/* Buy Button */}
    {shouldShowBuyButton() && (
      <button
        className="w-full bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-green-700 transition text-xs sm:text-base"
        onClick={handleBuyCourse}
      >
        Buy Now - ₹{course.price}
      </button>
    )}

    {/* Purchased / Instructor / Admin Messages */}
    {isAuthenticated && !isAdmin && !isCourseOwnerCheck() && isPurchased && (
      <div className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs mt-2">
        ✅ You have purchased this course
      </div>
    )}
    {isCourseOwnerCheck() && (
      <div className="bg-blue-800 text-blue-200 px-2 py-1 rounded text-xs mt-2">
        ✅ You are the instructor of this course
      </div>
    )}
    {shouldShowInstructorActions() && (
      <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
        <button
          className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition text-xs"
          onClick={() => navigate(`/courses/${course.id}/edit`)}
        >
          ✏️ Edit Course
        </button>
        <button
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition text-xs"
          onClick={() => navigate(`/courses/${course.id}/add-video`)}
        >
          ➕ Add Videos
        </button>
        <button
          className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition text-xs"
          onClick={() => navigate(`/courses/${course.id}/students`)}
        >
          👥 Enrolled Students
        </button>
      </div>
    )}
    {isAdminButNotOwner() && (
      <div className="mt-2 bg-red-800 text-red-200 px-2 py-1 rounded text-xs text-center">
        🔧 Admin View - Read Only
      </div>
    )}
  </div>
</div>



      {/* Videos Section */}
      <h4 className="text-xl sm:text-2xl font-semibold my-5">📺 Course Videos</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
        {course.videos?.length ? (
          course.videos.map((video, idx) => (
            <div key={video.id} className="bg-gray-800 rounded-lg shadow p-3 flex flex-col justify-between w-full overflow-hidden">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {canViewVideos() ? (
                  videoUrls[video.id] ? (
                    <iframe
                      src={videoUrls[video.id].includes('youtu.be/')
                        ? videoUrls[video.id].replace('https://youtu.be/', 'https://www.youtube.com/embed/').split('?')[0]
                        : videoUrls[video.id].replace('watch?v=', 'embed/')
                      }
                      title={`Video ${idx + 1}: ${video.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full bg-gray-700 text-white rounded absolute top-0 left-0 w-full">
                      <p className="text-sm">⏳ Loading video...</p>
                    </div>
                  )
                ) : (
                  <div className="flex justify-center items-center h-full bg-gray-700 text-white rounded absolute top-0 left-0 w-full">
                    <p className="text-sm text-center px-2">🔒 {isAuthenticated ? 'Purchase this course to unlock videos' : 'Login and purchase to view videos'}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col h-full mt-2">
                <h6 className="font-medium mb-1">{idx + 1}. {video.title}</h6>
                <small className="text-gray-400 mb-2">
                  ⏱️ {video.duration} min{' '}
                  {parseFloat(video.duration) < 2 && (
                    <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 text-xs rounded ml-2">Short</span>
                  )}
                </small>
                {shouldShowInstructorActions() && (
                  <div className="mt-auto flex gap-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700" onClick={() => navigate(`/videos/updateInfo/${video.id}`)}>✏️ Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" onClick={() => handleDeleteVideo(video.id)}>🗑️ Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400 text-lg">📹 No videos uploaded yet.</p>
            {shouldShowInstructorActions() && (
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={() => navigate(`/courses/${course.id}/add-video`)}>➕ Add First Video</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
