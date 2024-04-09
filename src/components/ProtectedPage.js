
import React from 'react';
import { useCookies } from 'react-cookie';

const ProtectedPage = () => {
  const [cookies, , removeCookie] = useCookies(['authToken']);

  const handleLogout = () => {
    // Clear the authToken cookie
    removeCookie('authToken', { path: '/' });
  };

  return (
    <div>
      <h2>Protected Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
