import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  GetCourseById,
  DeleteVideo,
  getVideoLink,
  isCoursePurchasedByUser,
} from '../../services/Userservice';

function CourseDetails({ isAuthenticated, userRole, userId }) {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [videoUrls, setVideoUrls] = useState({});
  const [isPurchased, setIsPurchased] = useState(false);
  const [loadingPurchaseStatus, setLoadingPurchaseStatus] = useState(true);

  const { courseId } = useParams();
  const navigate = useNavigate();
  const isAdmin = String(userRole).toLowerCase() === 'admin';

  useEffect(() => {
    fetchCourseDetails();
    if (isAuthenticated && !isAdmin) {
      checkPurchaseStatus();
    } else {
      setLoadingPurchaseStatus(false);
    }
  }, [courseId, userId]);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await GetCourseById(courseId);
      setCourse(data);
      if (data.videos) fetchVideoUrls(data.videos);
    } catch (err) {
      setError('Failed to load course details');
      console.error(err);
    }
  };

  const fetchVideoUrls = async (videos) => {
    const urls = {};
    for (const video of videos) {
      try {
        const res = await getVideoLink(video.id);
        urls[video.id] = res.data;
      } catch {
        urls[video.id] = null;
      }
    }
    setVideoUrls(urls);
  };

  const checkPurchaseStatus = async () => {
    try {
      const { data } = await isCoursePurchasedByUser(courseId);
      setIsPurchased(data);
    } catch (err) {
      console.error('Error checking purchase status:', err);
      setIsPurchased(false);
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
      setError('Failed to delete video');
      console.error(err);
    }
  };

  const handleBuyCourse = () => navigate(`/buy/${courseId}`);

  if (error)
    return <div className="text-red-500 bg-red-200 p-4 mt-4 rounded">{error}</div>;

  if (!course || loadingPurchaseStatus)
    return <div className="text-center mt-6 text-gray-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-8">
      <button
        className="mb-6 text-sm border border-gray-500 px-4 py-2 rounded hover:bg-gray-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Back to Courses
      </button>

      {/* Course Header */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <div>
          <img
            src={course.imageUrl}
            alt={course.title}
            className="rounded-lg w-full h-auto object-cover shadow"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-3">{course.title}</h2>
          <p className="text-gray-400 mb-4">{course.description}</p>
          <p><span className="font-semibold text-white">🎓 Instructor:</span> {course.instructor}</p>
          <p><span className="font-semibold text-white">📚 Category:</span> {course.category}</p>
          <p><span className="font-semibold text-white">💰 Price:</span> ₹{course.price}</p>

          {!isAdmin && isAuthenticated && !isPurchased && (
            <button
              className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={handleBuyCourse}
            >
              Buy Now
            </button>
          )}

          {isAdmin && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                onClick={() => navigate(`/courses/${course.id}/edit`)}
              >
                ✏️ Edit Course
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/courses/${course.id}/add-video`)}
              >
                ➕ Add Videos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Videos Section */}
      <h4 className="text-2xl font-semibold mb-5">📺 Course Videos</h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.videos?.length ? (
          course.videos.map((video, idx) => (
            <div key={video.id} className="bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between h-full">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                {(isAdmin || (isAuthenticated && isPurchased)) ? (
                  videoUrls[video.id] ? (
                    <iframe
                      src={
                        videoUrls[video.id].includes('youtu.be/')
                          ? videoUrls[video.id].replace('https://youtu.be/', 'https://www.youtube.com/embed/').split('?')[0]
                          : videoUrls[video.id].replace('watch?v=', 'embed/')
                      }
                      title={`Video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded w-full h-full"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full bg-gray-700 text-white rounded">
                      <p className="text-sm">⏳ Loading video...</p>
                    </div>
                  )
                ) : (
                  <div className="flex justify-center items-center h-full bg-gray-700 text-white rounded">
                    <p className="text-sm">🔒 Buy this course to unlock videos</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col h-full">
                <h6 className="font-medium mb-1">{idx + 1}. {video.title}</h6>
                <small className="text-gray-400 mb-2">
                  ⏱️ {video.duration} min{" "}
                  {parseFloat(video.duration) < 2 && (
                    <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 text-xs rounded ml-2">
                      Short
                    </span>
                  )}
                </small>

                {isAdmin && (
                  <div className="mt-auto flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      onClick={() => navigate(`/videos/updateInfo/${video.id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
