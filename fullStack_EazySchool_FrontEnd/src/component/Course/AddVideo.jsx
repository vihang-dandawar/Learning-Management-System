import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addVideosToCourse } from '../../services/Userservice';

function AddVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({ title: '', videoUrl: '', duration: '' });

  const handleAdd = async () => {
    try {
      await addVideosToCourse(id, video);
      alert("✅ Video added!");
      navigate(`/courses/${id}`);
    } catch (err) {
      alert("❌ Failed to add video");
    }
  };

  return (
    <section className="py-5" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0f172a, #1e293b)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-lg border-0 rounded-4"
              style={{ backgroundColor: '#1e293b', color: '#f1f5f9' }}
            >
              <div className="card-body p-4">
                <h3 className="text-center mb-4 fw-bold text-info">🎥 Add New Video</h3>

                <div className="form-group mb-3">
                  <label className="fw-semibold">Video Title</label>
                  <input
                    type="text"
                    className="form-control text-light"
                    style={{
                      backgroundColor: '#334155',
                      border: '1px solid #475569',
                      color: '#f1f5f9',
                    }}
                    placeholder="Enter video title"
                    value={video.title}
                    onChange={(e) => setVideo({ ...video, title: e.target.value })}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="fw-semibold">YouTube URL</label>
                  <input
                    type="text"
                    className="form-control text-light"
                    style={{
                      backgroundColor: '#334155',
                      border: '1px solid #475569',
                      color: '#f1f5f9',
                    }}
                    placeholder="Paste YouTube URL"
                    value={video.videoUrl}
                    onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="fw-semibold">Duration</label>
                  <input
                    type="text"
                    className="form-control text-light"
                    style={{
                      backgroundColor: '#334155',
                      border: '1px solid #475569',
                      color: '#f1f5f9',
                    }}
                    placeholder="e.g., 5 min"
                    value={video.duration}
                    onChange={(e) => setVideo({ ...video, duration: e.target.value })}
                  />
                </div>

                <button className="btn btn-info w-100 fw-semibold text-dark" onClick={handleAdd}>
                  ➕ Add Video to Course
                </button>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-outline-light text-white"
                onClick={() => navigate(`/courses/${id}`)}
              >
                ⬅ Back to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddVideo;
