'use client';
import axios from 'axios';

export const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};
