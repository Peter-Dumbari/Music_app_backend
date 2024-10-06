import Category from "../models/categoryModel.mjs";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    return res.json({ msg: "Category deleted" }).status(204);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
