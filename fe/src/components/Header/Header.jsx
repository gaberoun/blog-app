import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../MyContext';

export default function Header() {
  const { user, setIsLoggedIn } = useContext(MyContext);

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <header className='flex justify-between p-2 bg-neutral-900'>
      <Link to='/'>Hello <strong>{user.username}!</strong></Link>
      <div className='flex gap-2'>
        <Link className='hover:bg-neutral-500 px-1' to='/create-blog'>Create Blog</Link>
        <button className='hover:bg-neutral-500 px-1' onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
