import User from "../models/User.js";

// Mark course as completed
export const completeCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const courseId = req.params.courseId;

    if (!user.progress.includes(courseId)) {
      user.progress.push(courseId);
      await user.save();
    }

    res.json({
      message: "Course marked as completed",
      progress: user.progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user progress
export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("progress");

    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};