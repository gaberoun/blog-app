import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Content field is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export default Comment;
