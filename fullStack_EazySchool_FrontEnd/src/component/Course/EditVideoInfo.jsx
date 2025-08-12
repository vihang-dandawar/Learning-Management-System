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

  if (loading) return <div className="text-center text-blue-200 py-10">Loading video data...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          className="mb-6 text-sm text-blue-300 hover:text-white transition"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="bg-blue-800 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-8 tracking-wide">✏️ Edit Video Info</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-blue-700 placeholder-blue-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter video title"
                value={video.title}
                onChange={(e) => setVideo({ ...video, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video URL</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-blue-700 placeholder-blue-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter YouTube or video URL"
                value={video.videoUrl}
                onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-blue-700 placeholder-blue-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="E.g., 10 min"
                value={video.duration}
                onChange={(e) => setVideo({ ...video, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button
              className="bg-cyan-500 hover:bg-cyan-600 transition text-blue-900 px-8 py-3 rounded-md font-semibold shadow-md"
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
