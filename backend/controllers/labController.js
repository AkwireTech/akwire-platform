import Lab from "../models/Lab.js";

// =============================
// GET ALL LABS (for dashboard)
// =============================
export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find().sort({ order: 1 });

    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =============================
// GET SINGLE LAB (FOR TERMINAL ENGINE)
// =============================
export const getLabById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findOne({ labId: id });

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.json(lab);

  } catch (error) {
    next(error);
  }
};

// =============================
// CREATE LAB (ADMIN)
// =============================
export const createLab = async (req, res, next) => {
  try {
    const {
      labId,
      title,
      clearance,
      briefing,
      objective,
      tasks,
      scenarios,
      hints
    } = req.body;

    const lab = await Lab.create({
      labId,
      title,
      clearance,
      briefing,
      objective,
      tasks,
      scenarios,
      hints
    });

    res.status(201).json(lab);

  } catch (error) {
    next(error);
  }
};

// =============================
// UPDATE LAB (ADMIN)
// =============================
export const updateLab = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.json(lab);

  } catch (error) {
    next(error);
  }
};

// =============================
// DELETE LAB (ADMIN)
// =============================
export const deleteLab = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findByIdAndDelete(id);

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.json({ message: "Lab deleted" });

  } catch (error) {
    next(error);
  }
};