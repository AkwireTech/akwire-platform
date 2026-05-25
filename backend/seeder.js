import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import Lab from "./models/Lab.js";
import User from "./models/User.js";

dotenv.config();

// 1. Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// 2. Data to seed
const courses = [
  {
    title: "Domain 1: General Security Concepts",
    category: "Architecture",
    lessons: ["CIA Triad", "Security Controls", "Auth vs Auth"],
  },
  {
    title: "Domain 2: Threats, Vulnerabilities, and Mitigations",
    category: "Threats",
    lessons: ["Malware", "Social Engineering", "Vulnerability Mgmt"],
  },
  {
    title: "Domain 3: Security Architecture",
    category: "Architecture",
    lessons: ["Cloud Models", "Zero Trust", "Cryptography"],
  },
  {
    title: "Domain 4: Security Operations",
    category: "Operations",
    lessons: ["Incident Response", "Forensics", "Logging"],
  },
  {
    title: "Domain 5: Security Program Management",
    category: "Management",
    lessons: ["Risk Assessment", "Privacy/GDPR", "Auditing"],
  },
];

const labs = [
  {
    title: "Lab 1: Log Analysis",
    clearance: "LEVEL 2",
    briefing: "Analyze system logs for suspicious activity",
    objective: "Identify brute-force attacks and anomalies",
  },
  {
    title: "Lab 2: Firewall Configuration",
    clearance: "LEVEL 3",
    briefing: "Configure firewall rules to block malicious IPs",
    objective: "Implement proper iptables rules",
  },
];

const users = [
  {
    username: "AdminUser",
    email: "admin@example.com",
    password: "Admin123!",
    role: "admin",
  },
  {
    username: "StudentUser",
    email: "student@example.com",
    password: "Student123!",
    role: "student",
  },
];

// 3. Seed Function
const seedData = async () => {
  try {
    await Course.deleteMany({});
    await Lab.deleteMany({});
    await User.deleteMany({}); // ← add this

    await Course.insertMany(courses);
    await Lab.insertMany(labs);
    for (let user of users) {
    await User.create(user);
  }

    console.log("Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();