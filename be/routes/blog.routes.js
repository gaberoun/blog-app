import { Router } from 'express';
import multer from 'multer';
import { storage } from '../config/storage.js';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
} from '../controllers/blog.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middleware.js';

const blogRoutes = Router();
const blogImage = multer({ storage });

blogRoutes.post('/', blogImage.single('blog-image'), verifyAccessToken, createBlog);
blogRoutes.get('/', getAllBlogs);
blogRoutes.get('/:blogId', getBlogById);
blogRoutes.delete('/:blogId/:imageFilename', deleteBlogById);

export default blogRoutes;
