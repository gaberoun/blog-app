import { useState } from 'react';
import { Link } from "react-router-dom";
import useLogin from '../../hooks/useLogin';

export default function LoginScreen() {
  const [error, login] = useLogin();
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const userCredentials = {...fields};

  return (
    <>
      <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        Sign in to your account
      </h2>

      <form className='space-y-6 mt-10 mx-auto sm:w-full max-w-sm' onSubmit={(e) => login(e, userCredentials)}>
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
      <p className="mt-5 text-center text-md font-light leading-9 tracking-tight text-gray-700">
        Don't have an account yet? <Link to='/register' className="font-normal text-gray-800">Create an Account</Link>
      </p>
    </>
  );
};
