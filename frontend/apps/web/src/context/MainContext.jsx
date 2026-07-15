import { createContext, useContext, useEffect, useState } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const mainContext = createContext();
export const useMainContext = () => useContext(mainContext);
export const MainContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      if(!token){
        setLoading(false);
        return;
      }
      const response = await axiosClient.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully!")
    navigate("/login",
      {replace: true}
    )
    setUser({});
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (loading) return <div>Loading....</div>;
  return (
    <mainContext.Provider value={{ fetchProfile, user, logoutHandler,loading }}>
      {children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
