import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div>
      Welcome user , Discover the events on Nexus*
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default Homepage;