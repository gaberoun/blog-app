import { useState, useContext } from 'react';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';

export default function RegisterScreen() {
  const [error, login] = useLogin();
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
  });

  const userCredentials = { 
    email: fields.email, 
    password: fields.password 
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const {
        data: { data },
      } = await axios.post('http://localhost:8080/api/v1/users/register', fields);
      
      login(e, userCredentials)
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        Register an account
      </h2>

      <form className='space-y-6 mt-10 mx-auto sm:w-full max-w-sm' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Username</label>
          <input 
            required 
            type='text' 
            value={fields.username} 
            onChange={(e) => setFields({ ...fields, username: e.target.value })} 
            className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6'
          />
        </div>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Email</label>
          <input 
            required 
            type='email' 
            value={fields.email} 
            onChange={(e) => setFields({ ...fields, email: e.target.value })} 
            className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6'
          />
        </div>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
          <input 
            required 
            type='password' 
            value={fields.password} 
            onChange={(e) => setFields({ ...fields, password: e.target.value })} 
            className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6'
          />
        </div>

        <button className='flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600' type='submit'>
          Login
        </button>

        {error && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{error}</p>}
      </form>
    </>
  )
}
