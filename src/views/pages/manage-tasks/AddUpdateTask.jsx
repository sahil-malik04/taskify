import React, { useState } from "react";

const AddUpdateTask = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState(task?.priority || "Low");

  const handleSave = () => {
    if (!title) {
      alert("Task title is required.");
      return;
    }
    onSave({ ...task, title, priority });
  };
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">{task ? "Edit Task" : "Create Task"}</h2>
        <div className="modal-body">
          <label className="modal-label">
            <span>Task Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="Enter task title"
            />
          </label>
          <label className="modal-label">
            <span>Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="modal-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateTask;
