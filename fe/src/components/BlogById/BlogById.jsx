import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Modal from '../Modal/Modal';
import moment from 'moment';
import axios from 'axios';

export default function BlogById() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  const commentsList = comments.map((comment) => {
    return (
      <li key={comment._id}>
        <div>
          <p>{comment.userId.username}</p>
          <p>{moment(comment.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
        <p>{comment.content}</p>
      </li>
    )
  })

  const handleDelete = () => {
    
  }

  useEffect(() => {
    (async () => {
      const {data: { data }} = await axios.get(`http://localhost:8080/api/v1/blogs/${blogId}`);

      setBlog(data.blog);
      setComments(data.comments);
    })();
  });

  return (
    <div className='bg-neutral-800 py-5 px-8 rounded-md grid gap-2 w-11/12 max-w-4xl mx-auto my-5'>
      <div className='flex gap-1 font-semibold text-red-500 justify-self-end absoulte text-sm hover:text-red-400 cursor-pointer' onClick={handleDelete}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
          <path strokeLinecap='round' strokeLinejoin='round' d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
        </svg>
        Delete blog
      </div>

      <h1 className='text-3xl text-center'>{blog.title}</h1> 
      <div className='flex justify-between'>
        <p>Written by: <strong>{blog.userId?.username}</strong></p>
        <p className='italic'>{moment(blog.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <img className='justify-self-center' src={blog.image?.path} alt={blog.title} />
      <div>{blog.content}</div>
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.length ? commentsList : <li>No Comments...</li>}
        </ul>
      </div>
    </div>
  )
}
