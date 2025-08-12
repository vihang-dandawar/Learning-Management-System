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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-800 text-white py-8 px-4">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
        <button
          className="mb-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center text-dark-blue-400">🎥 Add New Video</h3>

        <input
          type="text"
          placeholder="Video Title"
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          value={video.title}
          onChange={(e) => setVideo({ ...video, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="YouTube URL"
          className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          value={video.videoUrl}
          onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })}
        />

        <input
          type="text"
          placeholder="Duration (e.g., 5 min)"
          className="w-full p-3 mb-6 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          value={video.duration}
          onChange={(e) => setVideo({ ...video, duration: e.target.value })}
        />

        <button
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-blue-900 transition"
          onClick={handleAdd}
        >
          ➕ Add Video to Course
        </button>
      </div>
    </div>
  );
}

export default AddVideo;
