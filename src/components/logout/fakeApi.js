// fakeApi.js
export const fakeLogoutRequest = async () => {
  // Simulate a successful logout
  return { data: { success: true } };
};

// In your Logout component, use this fake API module
// instead of directly calling axios.post("/api/auth/logout")
