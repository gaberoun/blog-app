import { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import MyContext from '../../MyContext';
import Header from '../../components/Header/Header';
import Chat from "../../components/Chat/Chat";

export default function HomeScreen() {
  const { isLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  });

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <aside className="bg-neutral-900 p-5 grid gap-2">
        <Chat />
      </aside>
    </>
  );
};
