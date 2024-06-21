import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';
import { cloudinary } from '../config/storage.js';
import { asyncHandler } from '../middlewares/error.middleware.js';

const createBlog = asyncHandler(async (req, res) => {
  const { userId, title, content } = req.body;
  const { path, filename } = req.file;

  const newBlog = new Blog({
    userId,
    title,
    content,
    image: { path, filename },
  });
  await newBlog.save();

  res.status(201).send({
    message: 'New blog created.',
    data: newBlog,
  });
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .select(['-content', '-updatedAt'])
    .sort({ createdAt: -1 })
    .populate({
      path: 'userId',
      select: 'username',
    });

  res.status(200).send({
    message: 'List of blogs.',
    data: blogs,
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blogById = await Blog.findOne({ _id: blogId })
    .select('-updatedAt')
    .populate({
      path: 'userId',
      select: 'username',
    });

  if (!blogById) {
    res.status(404);
    throw new Error ('Blog does not exist');
  }

  const comments = await Comment.find({ blogId })
    .select(['userId', 'content', 'createdAt'])
    .populate({
      path: 'userId',
      select: 'username',
    });

  res.status(200).send({
    message: `Blog with ID ${blogId}`,
    data: {
      blog: blogById,
      comments,
    },
  });
});

const deleteBlogById = asyncHandler(async (req, res) => {
  const { blogId, imageFilename } = req.params;

  const { deletedCount } = await Blog.deleteOne({ _id: blogId });
  if (!deletedCount) {
    res.status(500);
    throw new Error ('Something went wrong while deleting blog');
  } 

  const { result } = await cloudinary.uploader.destroy(`blog_app/${imageFilename}`);
  if (!result) {
    res.status(500);
    throw new Error ('Something went wrong while deleting image');
  }

  const { acknowledged } = await Comment.deleteMany({ blogId });
  if (!acknowledged) {
    res.status(500);
    throw new Error ('Something went wrong while deleting comments');
  }

  res.status(204).send();
});

export { createBlog, getAllBlogs, getBlogById, deleteBlogById };
