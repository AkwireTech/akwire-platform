import User from "../models/User.js";

// Mark course as completed

export const completeCourse = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    const courseId =
      req.params.courseId;

    const alreadyCompleted =

      user.progress.some(

        id =>
          id.toString() === courseId

      );


    if (!alreadyCompleted) {

      user.progress.push(
        courseId
      );

    }

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


    res.json({

      message:
        "Course marked as completed",

      progress:
        user.progress

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
      .populate("progress");

    res.json(
      user.progress
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
  console.log("LESSON REQUEST:", req.body);

  try {

    const user =
      await User.findById(req.user._id);

      if (!user.lessonProgress) {
      user.lessonProgress = [];
    }

      console.log("USER FOUND:", !!user);
      console.log("LESSON PROGRESS:", user.lessonProgress);

    const {
      courseId,
      lessonKey
    } = req.body;


    console.log("COURSE ID:", courseId);
    console.log("LESSON KEY:", lessonKey);
    console.log("USER LESSON PROGRESS:", user.lessonProgress);




    let courseProgress =

      user.lessonProgress.find(

        p =>

          p.courseId &&

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

      completedLessons:
        user.lessonProgress?.length || 0

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