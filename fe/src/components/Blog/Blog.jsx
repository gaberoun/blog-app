import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Blog({ blogId, date, imageUrl, username, title }) {
  return (
    <Link to={`/blogs/${blogId}`} className='p-2 bg-neutral-800 rounded-md grid gap-1 overflow-hidden'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <p className='text-right'>{username}</p>
      <img className='rounded-sm object-cover h-72 w-full' src={imageUrl} alt={title} />
      <p className='text-xs italic text-right'>
        {moment(date).format('MMMM Do YYYY, h:mm a')}
      </p>
    </Link>
  );
};
