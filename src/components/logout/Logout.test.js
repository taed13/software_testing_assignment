// Logout.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Logout from "./Logout";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  },
}));

test("clicking logout button triggers the logout process", async () => {
  render(<Logout />);
  const logoutButton = screen.getByRole("button", { name: /logout/i });

  fireEvent.click(logoutButton);

  // Wait for the asynchronous operation to complete
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  // Additional assertions based on your logout process
  const successMessage = screen.getByText(/logout successful/i);
  expect(successMessage).toBeInTheDocument();
});
