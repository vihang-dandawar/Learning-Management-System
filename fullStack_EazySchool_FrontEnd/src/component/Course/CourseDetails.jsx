import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetCourseById, DeleteVideo, getVideoLink } from '../../services/Userservice';
import './CourseDetails.css';

function CourseDetails({ isAuthenticated, userRole }) {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videoUrls, setVideoUrls] = useState({});

  const isAdmin = String(userRole).toLowerCase() === 'admin';

  const fetchVideoUrls = async (videos) => {
    const urls = {};
    for (const video of videos) {
      try {
        const res = await getVideoLink(video.id);
        urls[video.id] = res.data;
      } catch (err) {
        urls[video.id] = null;
      }
    }
    setVideoUrls(urls);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await GetCourseById(courseId);
      setCourse(data);
      if (data.videos) {
        fetchVideoUrls(data.videos);
      }
    } catch (err) {
      setError('Failed to load course details');
      console.error(err);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await DeleteVideo(videoId);
      fetchCourseDetails();
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
    }
  };

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!course) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container py-5">
      <button className="btn btn-outline-dark mb-4 fw-bold" onClick={() => navigate(-1)}>
        ← Back to Courses
      </button>

      <div className="row g-4 align-items-center bg-light rounded shadow p-4 mb-4">
        <div className="col-md-5">
          <img
            src={course.imageUrl}
            className="img-fluid rounded border border-2 shadow-sm"
            alt={course.title}
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold text-primary">{course.title}</h2>
          <p className="text-muted">{course.description}</p>
          <p><strong>🎓 Instructor:</strong> {course.instructor}</p>
          <p><strong>📚 Category:</strong> {course.category}</p>
          <p><strong>💰 Price:</strong> ₹{course.price}</p>

          {isAdmin && (
            <div className="mt-4">
              <button
                className="btn btn-outline-warning me-2 fw-semibold"
                onClick={() => navigate(`/courses/${course.id}/edit`)}
              >
                ✏️ Edit Course
              </button>
              <button
                className="btn btn-outline-primary fw-semibold"
                onClick={() => navigate(`/courses/${course.id}/add-video`)}
              >
                ➕ Add Videos
              </button>
            </div>
          )}
        </div>
      </div>

      <h4 className="text-secondary fw-bold mb-3">📺 Course Videos</h4>
      <div className="row">
        {course.videos?.length ? (
          course.videos.map((video, idx) => (
            <div className="col-md-4 col-sm-6 mb-4" key={video.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 video-card">
                <div className="position-relative">
                  <div className="ratio ratio-16x9 rounded-top overflow-hidden">
                    {isAuthenticated ? (
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
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-white rounded-2">
                          <p className="text-center p-3">⏳ Loading video...</p>
                        </div>
                      )
                    ) : (
                      <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-white rounded-2">
                        <p className="text-center p-3">🔒 Please login to watch this video</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-body py-3 px-3 d-flex flex-column">
                  <h6 className="card-title fw-semibold text-dark mb-1">
                    {idx + 1}. {video.title}
                  </h6>
                  <small className="text-muted mb-2">
                    ⏱️ {video.duration} min
                    {parseFloat(video.duration) < 2 && (
                      <span className="badge bg-warning text-dark ms-2">Short</span>
                    )}
                  </small>

                  {isAdmin && (
                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`/videos/updateInfo/${video.id}`)}
                      >
                        ✏️ Edit Info
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
