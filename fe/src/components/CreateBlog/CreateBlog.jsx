import axios from 'axios';
import { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../MyContext';
import { blogReducer, initialState } from '../../reducers/blogReducer';

export default function CreateBlog() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const { user: { accessToken } } = useContext(MyContext);
  const [fields, setFields] = useState({
    title: '',
    content: '',
    imageFile: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', fields.title);
    data.append('content', fields.content);
    data.append('blog-image', fields.imageFile);

    const newBlog = await axios.post(
      'http://localhost:8080/api/v1/blogs', 
      data, 
      {headers: { Authorization: `Bearer ${accessToken}` }}
    );

    dispatch({ type: 'BLOG_ADD', payload: newBlog });
    navigate('/');
  }
  
  return (
    <>
      <form className='space-y-6 mt-10 mx-auto sm:w-full w-11/12 max-w-3xl' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Title</label>
          <input 
            className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6' 
            type='text' 
            value={fields.title} 
            onChange={(e) => setFields({ ...fields, title: e.target.value })} 
          />
        </div>

        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Content</label>
          <textarea 
            className='block w-full text-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6' 
            type='text' 
            rows={4}
            value={fields.content} 
            placeholder='Write your thoughts here...'
            onChange={(e) => setFields({ ...fields, content: e.target.value })} 
          />
        </div>

        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>Upload an Image</label>
          <input 
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none'
            type='file'
            id='file-input' 
            onChange={(e) => setFields({ ...fields, imageFile: e.target.files[0] })}   
          />
          <p className='mt-1 text-sm text-gray-500'>PNG, JPG or JPEG (Recommended: 800x400px)</p>
        </div>

        <button className='flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600' type='submit'>Create Blog</button>
      </form>
    </>
  )
}
