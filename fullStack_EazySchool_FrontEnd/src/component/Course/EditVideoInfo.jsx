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

  if (loading) return <div className="text-center text-white py-10">Loading video data...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          className="mb-6 text-sm text-gray-300 hover:text-white transition"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="bg-gray-800 shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-indigo-400 mb-6">✏️ Edit Video Info</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">Video Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter video title"
                value={video.title}
                onChange={(e) => setVideo({ ...video, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Video URL</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter YouTube or video URL"
                value={video.videoUrl}
                onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Duration</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="E.g., 10 min"
                value={video.duration}
                onChange={(e) => setVideo({ ...video, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-md font-semibold"
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
