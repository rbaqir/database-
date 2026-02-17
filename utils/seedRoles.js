import { Role } from "../models/Role.js";

export const seedRoles = async () => {
  const roles = ["basic_user", "team_lead", "admin"];

  for (const role of roles) {
    await Role.findOrCreate({
      where: {
        name: role,
      },
    });
  }

  console.log("Roles seeded successfully");
};
