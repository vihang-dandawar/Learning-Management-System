import React, { useState } from "react";
import { InstructorApplicationForm } from "../../services/Userservice";

function BecomeInstructorForm({ onSuccess }) {
  const [expertiseArea, setExpertiseArea] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!expertiseArea.trim() || !bio.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await InstructorApplicationForm({ expertiseArea, bio });

      setSuccess("Application submitted successfully!");
      setExpertiseArea("");
      setBio("");
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Failed to submit application. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-400">{success}</div>}

        <input
          type="text"
          placeholder="Expertise Area"
          value={expertiseArea}
          onChange={(e) => setExpertiseArea(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
          required
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-100"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-full transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default BecomeInstructorForm;
