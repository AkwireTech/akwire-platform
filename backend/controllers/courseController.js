
import Course from "../models/Course.js";

// ==========================================
// GET ALL COURSES
// ==========================================

export const getCourses = async (req, res) => {

    try {

        const courses =
            await Course.find({
                published: true
            });

        res.json(courses);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to fetch courses"
        });

    }

};

// ==========================================
// GET SINGLE COURSE
// ==========================================

export const getCourse = async (req, res) => {

    try {

        const course =
            await Course.findById(
                req.params.id
            );

        if (!course) {

            return res.status(404).json({
                message:
                    "Course not found"
            });

        }

        res.json(course);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to fetch course"
        });

    }

};

// ==========================================
// CREATE COURSE
// ==========================================

export const createCourse = async (req, res) => {

    try {

        const {

            title,
            description,
            domain,
            thumbnail,
            modules

        } = req.body;

        const course =
            await Course.create({

                title,
                description,
                domain,
                thumbnail,

                modules:
                    modules || [],

                published: true

            });

        res.status(201).json(course);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to create course"
        });

    }

};

// ==========================================
// UPDATE COURSE
// ==========================================

export const updateCourse = async (req, res) => {

    try {

        const updated =
            await Course.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );

        res.json(updated);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to update course"
        });

    }

};

// ==========================================
// DELETE COURSE
// ==========================================

export const deleteCourse = async (req, res) => {

    try {

        await Course.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
                "Course deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to delete course"
        });

    }

};


export const addModule = async (req, res) => {

    console.log("✅ addModule reached");
    console.log(req.params);
    console.log(req.body);
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    course.modules.push({
      title: req.body.title,
      lessons: []
    });

    await course.save();

    res.json(course);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add module"
    });

  }
};


export const addLesson = async (req, res) => {
  try {

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const module = course.modules.id(req.params.moduleId);

    if (!module) {
      return res.status(404).json({
        message: "Module not found"
      });
    }

    module.lessons.push({
      title: req.body.title,
      content: req.body.content || "",
      videoUrl: req.body.videoUrl || "",
      resources: req.body.resources || []
    });

    await course.save();

    res.json(course);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add lesson"
    });

  }
};