import User from "../models/User.js";
import Course from "../models/Course.js";

// Mark course as completed

export const completeCourse = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    const courseId =
      req.params.courseId;
      
    const certificateExists =

      user.completedCourses.some(

        item =>

          item.courseId &&
          item.courseId.toString() === courseId

      );

    if (!certificateExists) {

      user.completedCourses.push({

        courseId,

        completedAt:
          new Date()

      });

    }

    await user.save();

    const course = await Course.findById(courseId);

    let totalLessons = 0;

    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });

    const updatedProgress =
      user.lessonProgress.find(
        p => p.courseId.toString() === courseId
      );

    const completedCount =
      updatedProgress?.completedLessons?.length || 0;

    if (completedCount === totalLessons) {

      const alreadyCompleted =
        user.completedCourses.some(
          item =>
            item.courseId &&
            item.courseId.toString() === courseId
        );

      if (!alreadyCompleted) {

        user.completedCourses.push({
          courseId,
          completedAt: new Date()
        });

        await user.save();
      }
    }

    res.json({

      message:
        "Course marked as completed",

      completedCourses:
        user.completedCourses

    });

      } catch (error) {

        console.error(
          "COMPLETE COURSE ERROR:",
          error
        );

        res.status(500).json({

          message:
            error.message

        });

      }

    };

// Get user progress

export const getProgress = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id)
      .populate(
        "completedCourses.courseId"
      );

    res.json(
      user.completedCourses || []
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ==========================================
// MARK LESSON COMPLETE
// ==========================================

export const markLessonComplete = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.lessonProgress) {
      user.lessonProgress = [];
    }

    const { courseId, lessonKey } = req.body;

    let courseProgress = user.lessonProgress.find(
      p =>
        p.courseId &&
        p.courseId.toString() === courseId
    );

    if (!courseProgress) {
      user.lessonProgress.push({
        courseId,
        completedLessons: [lessonKey]
      });

      courseProgress = user.lessonProgress[user.lessonProgress.length - 1];
    } else {
      if (!courseProgress.completedLessons.includes(lessonKey)) {
        courseProgress.completedLessons.push(lessonKey);
      }
    }

    // Save lesson progress
    await user.save();

    // Get course
    const course = await Course.findById(courseId);

    let totalLessons = 0;

    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });

    const completedCount =
      courseProgress.completedLessons.length;

    // Mark course complete only when all lessons are finished
    if (completedCount === totalLessons) {
      const alreadyCompleted =
        user.completedCourses.some(
          item =>
            item.courseId &&
            item.courseId.toString() === courseId
        );

      if (!alreadyCompleted) {
        user.completedCourses.push({
          courseId,
          completedAt: new Date()
        });

        await user.save();
      }
    }

    res.json({
      message: "Lesson progress saved",
      completedLessons: completedCount,
      totalLessons
    });

  } catch (error) {
    console.error("MARK LESSON COMPLETE ERROR:", error);

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

    console.error(
      "GET LESSON PROGRESS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};

// ==========================================
// GET CERTIFICATES
// ==========================================

export const getCertificates = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user._id
      )
      .populate(
        "certifiedCourses"
      );

    const certificates =

      user.certifiedCourses.map(
        course => ({

          courseId: course,

          completedAt:
            new Date()

        })
      );

    res.json(
      certificates
    );

  } catch (error) {

    console.error(
      "GET CERTIFICATES ERROR:",
      error
    );

    res.status(500).json({

      message:
        error.message

    });

  }

};

export const getStatus = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user._id
      );

    const courses =
    await Course.find();

    let totalLessons = 0;

    courses.forEach(course => {

      course.modules.forEach(module => {

        totalLessons +=
          module.lessons.length;

      });

    });

    const completedLessons =
      user.lessonProgress.reduce(
        (total, course) =>
          total + (course.completedLessons?.length || 0),
        0
      );

    const progressPercent =

      totalLessons > 0

        ? Math.round(
            (completedLessons / totalLessons) * 100
          )

        : 0;

    res.json({

      coursesCompleted:
        user.completedCourses?.length || 0,

      certificatesEarned:
        user.certifiedCourses?.length || 0,

      coursesCertified:
        user.certifiedCourses?.length || 0,

      finalExamUnlocked:
        (user.completedCourses?.length || 0) > 0,

      finalExamPassed:
        (user.certifiedCourses?.length || 0) > 0,
      
      totalLessons,

      completedLessons,

      progressPercent


    });

  } catch (error) {

    console.error(
      "STATUS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};