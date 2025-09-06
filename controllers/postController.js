import Post from "../schemas/postSchema.js";

// Create a post
export const createPost = async (req, res) => {
  const userId = req.user._id;
  try {
    const post = await Post.create({ ...req.body, authorId: userId });
    res
      .status(200)
      .json({ responseMessage: "Post created successfully!", data: post });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId", "username email");
    if (posts) {
      res
        .status(200)
        .json({ responseMessage: "Posts fetched successfully", data: posts });
    } else {
      res.status(404).json({ responseMessage: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("authorId", "username email")
      .populate({
        path: "comments",
        populate: { path: "authorId", select: "username" }, // populate comment author
      });
    if (post) {
      res
        .status(200)
        .json({ responseMessage: "Post fetched successfully", data: post });
    } else {
      return res.status(404).json({ message: "Post does not exist" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const { body, user, params } = req;
  try {
    const post = await Post.findById(params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (
      post.authorId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        message:
          "You do not have access to update this post. Please contact admin!",
      });
    }

    post.title = body.title || post.title;
    post.content = body.content || post.content;
    const updated = await post.save();
    res
      .status(200)
      .json({ responseMessage: "Post updated successfully", data: updated });
  } catch {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { user } = req;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });


    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
