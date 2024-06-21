import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Blog from '../Blog/Blog';
import { blogReducer, initialState } from '../../reducers/blogReducer';

export default function Blogs () {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const blogsList = state.blogs.map((blog) => {
    return (
      <Blog
        key={blog._id}
        blogId={blog._id}
        date={blog.createdAt}
        imageUrl={blog.image?.path}
        username={blog.userId?.username}
        title={blog.title}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get('http://localhost:8080/api/v1/blogs');

      localStorage.setItem('blogs', JSON.stringify(data));
      dispatch({ type: 'BLOG_LIST', payload: data });
    })();
  }, [state.blogs.length]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 m-2'>
      {blogsList}
    </div>
  );
};
