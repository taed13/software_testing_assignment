import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Register from "./Register";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Register />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Register />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Register />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  act(() => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
  });

  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Register />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  act(() => {
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  });

  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exist", () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  act(() => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  });

  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when clicked", () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  act(() => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);
  });

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  act(() => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);
  });

  // Wait for the state update to complete
  await waitFor(() => {});

  act(() => {
    // Move the expect statement outside the waitFor callback
    expect(buttonEl).not.toHaveTextContent(/please wait/i);
  });
});

test("user should be rendered after fetching", async () => {
  render(<Register />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  await act(async () => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(buttonEl);

    // Wait for the state update to complete
    await waitFor(() => {});
  });

  // Perform assertions related to the state update
  const userItem = screen.getByText("John");
  expect(userItem).toBeInTheDocument();
});
