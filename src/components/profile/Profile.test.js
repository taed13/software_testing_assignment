// Profile.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";

const mockUser = { name: "John Doe" };

test("renders user profile with correct information", () => {
  render(<Profile user={mockUser} />);
  const nameElement = screen.getByTestId("user-name");
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent(/John Doe/i);
});

test("allows user to edit and save profile information", async () => {
  render(<Profile user={mockUser} />);

  // Click the "Edit" button to start editing
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  // Change the name in the input field
  const nameInput = screen.getByLabelText("Name:");
  fireEvent.change(nameInput, { target: { value: "New John Doe" } });

  // Click the "Save" button to save the changes
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  // Verify that the user profile is updated with the new name
  const updatedNameElement = screen.getByTestId("user-name");
  expect(updatedNameElement).toBeInTheDocument();
  expect(updatedNameElement).toHaveTextContent("New John Doe");
});

test("cancels editing without saving changes", async () => {
  render(<Profile user={mockUser} />);

  // Click the edit button
  const editButton = screen.getByRole("button", { name: /edit/i });
  fireEvent.click(editButton);

  // Check if the input field is visible
  const inputElement = screen.getByLabelText(/name/i);
  expect(inputElement).toBeInTheDocument();

  // Update the name
  const newName = "New John Doe";
  fireEvent.change(inputElement, { target: { value: newName } });

  // Cancel editing
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);

  // Check if the original name is still displayed
  const originalNameElement = screen.getByTestId("user-name");
  expect(originalNameElement).toBeInTheDocument();
  expect(originalNameElement).toHaveTextContent(/John Doe/i);
});

// Add more test cases based on your component's functionality
