import { Routes, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

import Blogs from './components/Blogs/Blogs';
import CreateBlog from './components/CreateBlog/CreateBlog';
import BlogById from './components/BlogById/BlogById';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <div className='text-slate-100'>
      <ErrorBoundary>
        <Routes>
          <Route element={<HomeScreen />}>
            <Route path='/' element={<Blogs />} />
            <Route path='/blogs/:blogId' element={<BlogById />} />
            <Route path='/create-blog' element={<CreateBlog />} />
          </Route>
          <Route path='/login' element={<LoginScreen />} /> 
          <Route path='/register' element={<RegisterScreen />} /> 
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
