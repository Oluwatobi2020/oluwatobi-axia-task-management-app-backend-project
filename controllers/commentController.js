import Comment from "../schemas/commentSchema.js";
import Post from "../schemas/postSchema.js";

// Add comment
export const addComment = async (req, res) => {
  const { params, user, body } = req;
  try {
    const post = await Post.findById(params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      postId: params.id,
      authorId: user._id,
      content: body.content,
    });

    await Post.findByIdAndUpdate(
      params.id,
      { $push: { comments: comment._id } },
      { new: true }
    );
    res
      .status(200)
      .json({ responseMessage: "Comment added successfully!", data: comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).populate(
      "authorId",
      "username"
    );
    res.status(200).json({
      responseMessage: "Comment fetched successfully!",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  const { params, user } = req;
  try {
    const comment = await Comment.findById(params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.content = req.body.content || comment.content;
    const updated = await comment.save();
    res
      .status(200)
      .json({ responseMessage: "Comment updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  const { params, user } = req;
  try {
    const comment = await Comment.findById(params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (
      comment.authorId.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You do not have access to update this comment. Please contact admin!",
      });
    }

    await comment.deleteOne();
    res.status(200).json({ responseMessage: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
