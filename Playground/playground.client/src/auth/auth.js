// Utility functions for JWT authentication

export function getToken() {
  return localStorage.getItem('jwt');
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  // Optionally, check token expiry here
  return true;
}

export function logout() {
  localStorage.removeItem('jwt');
}
