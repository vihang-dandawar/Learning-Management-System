import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoDetailsById, updatevideoInfo } from '../../services/Userservice';

function EditVideoInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({ title: '', videoUrl: '', duration: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoDetailsById(id);
        setVideo(res.data);
        setLoading(false);
      } catch (error) {
        alert('Failed to fetch video');
        navigate(-1);
      }
    };

    fetchVideo();
  }, [id, navigate]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updatevideoInfo(id, video);
      alert('Video updated successfully');
      navigate(-1);
    } catch (err) {
      alert('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading video data...</div>;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h3 className="mb-4 text-primary fw-bold">✏️ Edit Video Info</h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Video Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter video title"
              value={video.title}
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Video URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter YouTube or video URL"
              value={video.videoUrl}
              onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Duration</label>
            <input
              type="text"
              className="form-control"
              placeholder="E.g., 10 min"
              value={video.duration}
              onChange={(e) => setVideo({ ...video, duration: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success fw-semibold px-4"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? 'Updating...' : '✅ Update Video Info'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVideoInfo;
