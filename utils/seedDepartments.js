import { Department } from "../models/Department.js";

export const seedDepartments = async () => {
  const departments = ["IT", "HR", "Finance"];

  for (const dept of departments) {
    await Department.findOrCreate({
      where: { name: dept }
    });
  }

  console.log("Departments seeded successfully");
};