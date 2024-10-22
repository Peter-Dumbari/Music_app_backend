import Blog from "../models/blogModel.mjs";

export const postBlog = async (req, res) => {
  const blogImgFile = req.file ? req.file.path : null;
  try {
    if (blogImgFile) req.body.blogImg = blogImgFile;

    const newBlog = await Blog.create(req.body);

    return res.status(201).json({
      message: "Blog posted succesfully",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to post the blogs", error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("comments");
    return res.status(201).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "failed to get the blogs", error });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res
      .status(201)
      .json(blog)
      .populate("comment")
      .exec((error, blog) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "error fetching comment", error });
        }
        res.json(blog);
      });
  } catch (error) {
    return res.status(500).json({ message: "Error getting blog", error });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blogImg = req.file ? req.file.path : null;
    if (blogImg) {
      req.body.blogImg = blogImg;
    }

    let blog = Blog.findByIdAndUpdate(id, req.body, { new: true });

    if (!blog) return res.status(404).json({ message: "Blog does not exit" });
    return res.status(200).json({
      message: "Blog updated succesfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

export const likeBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(500).json({ message: "blog not fouind" });

    const likeIndex = blog.likes.indexOf(userId);

    if (likeIndex === -1) {
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({ message: "Blog liked successfully" });
    } else {
      blog.likes.splice(likeIndex, 1);
      await blog.save();
      return res.status(200).json({ message: "Blog unliked successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error trying to like this blog", error });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(500).json({ message: "Blog not found" });

    await Comment.deleteMany({ blog: blog._id });

    await blog.remove();

    return res.status(200).json({ message: "Blog deleted sucessfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Blog failed to delete", error });
  }
};
