import { useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [description, setDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Feedback cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:9999/user", {
        description,
        userId: user.id, // Get user ID from localStorage
      });

      alert("Feedback submitted successfully!");
      setDescription(""); // Clear input field after submission
    } catch (error) {
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Submit your feedback:</p>

      <textarea
        placeholder="Enter your feedback here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default UserDashboard;
