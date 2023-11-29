// Profile.jsx
import React, { useState } from "react";

const Profile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedName(user.name); // Reset the edited name to the original value
  };

  const handleSave = () => {
    // Here you can add logic to save the edited name, e.g., make an API call
    // For simplicity, we'll just update the local state in this example
    setEditing(false);
    // Add logic to save the editedName, e.g., make an API call
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <div>
      <h1>User Profile</h1>
      {editing ? (
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={editedName}
            onChange={handleNameChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>Name:</strong>
          <span data-testid="user-name">{user.name}</span>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
