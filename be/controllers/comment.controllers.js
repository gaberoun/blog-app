import Comment from '../models/comment.model.js';
import User from '../models/user.model.js';
import Blog from '../models/blog.model.js';
import { asyncHandler } from '../middlewares/error.middleware.js';


const addComment = asyncHandler(async (req, res) => {
  const { userId, blogId, content } = req.body;

  const user = await User.findOne({ _id: userId });
  const blog = await Blog.findOne({ _id: blogId });

  if (!user || !blog) {
    res.status(404);
    throw new Error ('Blog/User not found');
  } 

  const newComment = new Comment({
    userId,
    blogId,
    content,
  });
  await newComment.save();

  res.status(201).send({
    message: `Comment create on blog with id ${blogId}`,
    data: newComment,
  });
});

const deleteCommentById = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const { deletedCount } = await Comment.deleteOne({ _id: commentId });

  if (!deletedCount) {
    res.status(500)
    throw new Error ('Something went wrong with deleting comment');
  }

  res.status(204).send();
});

export { addComment, deleteCommentById };
