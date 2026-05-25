import mongoose from "mongoose";
import dotenv from "dotenv";
import Lab from "./models/Lab.js";
import labs from "./data/labs.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedLabs = async () => {
  try {

    await Lab.deleteMany({});
    await Lab.insertMany(labs);

    console.log("Labs seeded!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedLabs();