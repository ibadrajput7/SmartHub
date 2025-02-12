export const adminAuth = {
  isAuthenticated() {
    return !!localStorage.getItem('admin_token');
  },
  
  getToken() {
    return localStorage.getItem('admin_token');
  },
  
  setToken(token: string) {
    localStorage.setItem('admin_token', token);
  },
  
  clearToken() {
    localStorage.removeItem('admin_token');
  }
};