import Category from "../schemas/categorySchema.js";

// Create Category
export const createCategory = async (req, res) => {
  const { body, user } = req;
  try {
    const category = await Category.create({ name: body.name, user: user._id });
    res.status(201).json({
      responseMessage: "Category created successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Get Categories for User
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    if (!categories)
      return res
        .status(404)
        .json("No record found! You need to create a category.");
    res.status(200).json({
      responseMessage: "List of categories fetched successfully!",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

//Get category By Id
export const getCategoryById = async (req, res) => {
    const {params, user} = req;
  try {
    const category = await Category.findOne({
      _id: params.id,
      user: user._id,
    });
    if (!category)
      return res.status(404).json({ responseMessage: "Category not found" });
    res.status(200).json({
      responseMessage: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  const { params, user, body } = req;
  try {
    const category = await Category.findOneAndUpdate(
      { _id: params.id, user: user._id },
      body,
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      responseMessage: "Category updated successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { params, user } = req;
  try {
    const category = await Category.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};
