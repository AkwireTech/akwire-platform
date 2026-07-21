import Course from "../models/Course.js";

// ==========================================
// GET ALL COURSES
// ==========================================
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            published: true
        });

        res.json(courses);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
};

// ==========================================
// GET SINGLE COURSE
// ==========================================
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch course"
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

        const course = await Course.create({
            title,
            description,
            domain,
            thumbnail,
            modules: modules || [],
            published: true
        });

        res.status(201).json(course);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create course"
        });
    }
};

// ==========================================
// UPDATE COURSE
// ==========================================
export const updateCourse = async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(
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
            message: "Failed to update course"
        });
    }
};

// ==========================================
// DELETE COURSE
// ==========================================
export const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);

        res.json({
            message: "Course deleted"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete course"
        });
    }
};

// ==========================================
// ADD MODULE TO COURSE
// ==========================================
export const addModuleToCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Module title is required"
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        course.modules.push({
            title: title.trim(),
            lessons: []
        });

        await course.save();

        res.status(201).json({
            message: "Module added successfully",
            course
        });
    } catch (error) {
        console.error("ADD MODULE ERROR:", error);

        res.status(500).json({
            message: "Server error while adding module"
        });
    }
};

// ==========================================
// UPDATE MODULE
// ==========================================
export const updateModule = async (req, res) => {
    try {
        const { id, moduleIndex } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Module title is required"
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const module = course.modules[moduleIndex];

        if (!module) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        module.title = title.trim();

        await course.save();

        res.json({
            message: "Module updated successfully",
            course
        });
    } catch (error) {
        console.error("UPDATE MODULE ERROR:", error);

        res.status(500).json({
            message: "Server error while updating module"
        });
    }
};

// ==========================================
// DELETE MODULE
// ==========================================
export const deleteModule = async (req, res) => {
    try {
        const { id, moduleIndex } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!course.modules[moduleIndex]) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        course.modules.splice(Number(moduleIndex), 1);

        await course.save();

        res.json({
            message: "Module deleted successfully",
            course
        });
    } catch (error) {
        console.error("DELETE MODULE ERROR:", error);

        res.status(500).json({
            message: "Server error while deleting module"
        });
    }
};

// ==========================================
// ADD LESSON TO MODULE
// ==========================================
export const addLessonToModule = async (req, res) => {
    try {
        const { id, moduleIndex } = req.params;

        const {
            title,
            overview = "",
            objectives = [],
            content = "",
            summary = "",
            keyTerms = [],
            knowledgeCheck = [],
            lab = {},
            flashcards = [],
            aiTutor = "",
            studyGuide = "",
            estimatedTime = 15,
            videoUrl = "",
            resources = []
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Lesson title is required"
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const module = course.modules[moduleIndex];

        if (!module) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        module.lessons.push({
            title: title.trim(),
            overview,
            objectives,
            content,
            summary,
            keyTerms,
            knowledgeCheck,
            lab,
            flashcards,
            aiTutor,
            studyGuide,
            estimatedTime,
            videoUrl,
            resources
        });

        await course.save();

        res.status(201).json({
            message: "Lesson added successfully",
            course
        });

    } catch (error) {
        console.error("ADD LESSON ERROR:", error);

        res.status(500).json({
            message: "Server error while adding lesson"
        });
    }
};

// ==========================================
// UPDATE LESSON
// ==========================================
export const updateLesson = async (req, res) => {
    try {

        const { id, moduleIndex, lessonIndex } = req.params;

        const {
            title,
            overview = "",
            objectives = [],
            content = "",
            summary = "",
            keyTerms = [],
            knowledgeCheck = [],
            lab = {},
            flashcards = [],
            aiTutor = "",
            studyGuide = "",
            estimatedTime = 15,
            videoUrl = "",
            resources = []
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Lesson title is required"
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const module = course.modules[moduleIndex];

        if (!module) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        const lesson = module.lessons[lessonIndex];

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        lesson.title = title.trim();
        lesson.overview = overview;
        lesson.objectives = objectives;
        lesson.content = content;
        lesson.summary = summary;
        lesson.keyTerms = keyTerms;
        lesson.knowledgeCheck = knowledgeCheck;
        lesson.lab = lab;
        lesson.flashcards = flashcards;
        lesson.aiTutor = aiTutor;
        lesson.studyGuide = studyGuide;
        lesson.estimatedTime = estimatedTime;
        lesson.videoUrl = videoUrl;
        lesson.resources = resources;

        await course.save();

console.log("Lesson before save:");
console.log(lesson);

        res.json({
            message: "Lesson updated successfully",
            course
        });

    } catch (error) {
        console.error("UPDATE LESSON ERROR:", error);

        res.status(500).json({
            message: "Server error while updating lesson"
        });
    }
};

// ==========================================
// DELETE LESSON
// ==========================================
export const deleteLesson = async (req, res) => {
    try {
        const { id, moduleIndex, lessonIndex } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const module = course.modules[moduleIndex];

        if (!module) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        if (!module.lessons[lessonIndex]) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        module.lessons.splice(Number(lessonIndex), 1);

        await course.save();

        res.json({
            message: "Lesson deleted successfully",
            course
        });
    } catch (error) {
        console.error("DELETE LESSON ERROR:", error);

        res.status(500).json({
            message: "Server error while deleting lesson"
        });
    }
};