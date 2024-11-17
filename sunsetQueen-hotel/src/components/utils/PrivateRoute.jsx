import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, userType }) {
  // Check if the user type is 'ADMIN'
  if (userType !== 'ADMIN') {
    // Redirect to a login or unauthorized page if not ADMIN
    return <Navigate to="/login" />;
  }

  // Render the protected component if the user is ADMIN
  return children;
}

export default PrivateRoute;
