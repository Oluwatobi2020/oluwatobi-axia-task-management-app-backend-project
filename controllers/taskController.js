import Task from "../schemas/taskSchema.js";
import User from "../schemas/userSchema.js";

// Create Task
export const createTask = async (req, res) => {
  const { title, description, category, deadline } = req.body;

  try {
    const validateUser = await User.findById(req.user._id);
    if (!validateUser)
      return res
        .status(404)
        .json("User not found. Please register before you proceed");
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      category,
      deadline,
    });
    res
      .status(201)
      .json({ responseMessage: "Task Created Successfully!", data: task });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Get All Tasks for Logged-in User
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).populate("category");
    if (!tasks) return res.status(404).json("No task was found for this user!");
    res.status(200).json({
      responseMessage: "Tasks list fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Get Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("category");
    if (!task)
      return res.status(404).json({ responseMessage: "Task not found" });
    res.status(200).json({
      responseMessage: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  const { params, user } = req;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: params.id, user: user._id },
      req.body,
      { new: true }
    );
    if (!task)
      return res.status(404).json({ responseMessage: "Task not found" });
    res.status(200).json({
      responseMessage: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { params, user } = req;
  try {
    const task = await Task.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });
    if (!task)
      return res.status(404).json({ responseMessage: "Task not found" });
    res.status(200).json({ responseMessage: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  const { body, user, params } = req;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: params.id, user: user._id },
      { status: body.action },
      { new: true }
    );
    res.status(200).json({
      responseMessage: `Task has been marked as ${body.action}d`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

