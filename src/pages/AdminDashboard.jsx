import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editFeedback, setEditFeedback] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:9999/admin");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/admin/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const openEditDialog = (feedback) => {
    setEditFeedback(feedback);
    setEditDescription(feedback.description);
  };

  const closeEditDialog = () => {
    setEditFeedback(null);
    setEditDescription("");
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9999/admin/${editFeedback.id}`, {
        description: editDescription,
      });
      closeEditDialog();
      fetchFeedbacks();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.id}</td>
              <td>{fb.description}</td>
              <td>
                <button onClick={() => alert(`Viewing: ${fb.description}`)}>
                  View
                </button>
                <button onClick={() => deleteFeedback(fb.id)}>Delete</button>
                <button onClick={() => openEditDialog(fb)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editFeedback && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Feedback</h2>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={closeEditDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>{`
        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .modal-content input {
          width: 80%;
          padding: 5px;
          margin: 10px 0;
        }
        .modal-content button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
