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
      alert("Video added!");
      navigate(`/courses/${id}`);
    } catch (err) {
      alert("Failed to add video");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Video</h2>
      <input className="form-control my-2" placeholder="Title" value={video.title}
        onChange={(e) => setVideo({ ...video, title: e.target.value })} />
      <input className="form-control my-2" placeholder="YouTube URL" value={video.videoUrl}
        onChange={(e) => setVideo({ ...video, videoUrl: e.target.value })} />
      <input className="form-control my-2" placeholder="Duration (e.g., 5 min)" value={video.duration}
        onChange={(e) => setVideo({ ...video, duration: e.target.value })} />
      <button className="btn btn-primary" onClick={handleAdd}>Add Video</button>
    </div>
  );
}

export default AddVideo;
