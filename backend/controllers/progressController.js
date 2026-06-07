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


// ==========================================
// MARK LESSON COMPLETE
// ==========================================

export const markLessonComplete = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    const {
      courseId,
      lessonKey
    } = req.body;

    let courseProgress =

      user.lessonProgress.find(

        p =>
          p.courseId.toString() === courseId

      );

    if (!courseProgress) {

      user.lessonProgress.push({

        courseId,

        completedLessons: [
          lessonKey
        ]

      });

    } else {

      if (

        !courseProgress.completedLessons.includes(
          lessonKey
        )

      ) {

        courseProgress.completedLessons.push(
          lessonKey
        );

      }

    }

    await user.save();

    res.json({

      message:
        "Lesson progress saved"

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==========================================
// GET LESSON PROGRESS
// ==========================================

export const getLessonProgress = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    res.json(
      user.lessonProgress || []
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};