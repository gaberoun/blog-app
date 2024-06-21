import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    title: {
      type: String,
      required: [true, "Title field is required."],
    },
    content: {
      type: String,
      required: [true, "Content field is required."],
    },
    image: {
      path: {
        type: String,
        required: [true, "Image path is required."],
      },
      filename: {
        type: String,
        required: [true, "Image filename is required."],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);
export default Blog;
