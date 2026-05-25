import {getCache,setCache} from "../utils/cache.js";

export const getCourses = async(req,res)=>{

const cached = getCache("courses");

if(cached){
return res.json(cached);
}

const courses = await Course.find({});

setCache("courses",courses);

res.json(courses);

};

// Create a new course (admin only)
export const createCourse = async (req, res, next) => {
  try {
    const { title, category, lessons } = req.body;
    const course = await Course.create({ title, category, lessons });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Update an existing course (admin only)
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, lessons } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { title, category, lessons },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    next(error);
  }
};

// Delete a course (admin only)
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (error) {
    next(error);
  }
};