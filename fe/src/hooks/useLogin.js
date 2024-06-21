import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';

const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();

      const {
        data: { data },
      } = await axios.post('http://localhost:8080/api/v1/users/login', userCredentials);

      if (!data) {
        console.log('User not found');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      navigate('/');

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } 
  };


  return [error, handleLogin];
}

export default useLogin;
