import { AsyncHandler } from "../utils/AsyncHandler.js";

const makeTeamLead = AsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const teamLeadRole = await Role.findOne({ where: { name: "team_lead" } });
  if (!teamLeadRole) {
    return res.status(400).json({ message: "Team Lead role not found" });
  }
  await User.update({ role_id: teamLeadRole.id }, { where: { id: userId } });

  res.json({ message: "User promoted to Team Lead successfully " });
});

const getOnlineUsers = AsyncHandler(async (req, res) => {
  const onlineIds = Array.from(req.app.get("onlineUsers").key());
  res.json({ onlineUsers: onlineIds });
});

const registerUser = AsyncHandler(async (req, res)=>{
    const {username, email, password, role_id, department_id} = req.body;
    const user = await User.create({username, email, password, role_id, department_id});
    res.json({message: "User registered successfully", user});
})

const updateProfile = AsyncHandler(async (req, res) => {
    const { username, email} = req.body;
    await User.update({ username, email }, { where: { id: req.user.id } });
    res.json({ message: "Profile updated successfully" });
})

export { makeTeamLead, getOnlineUsers, registerUser, updateProfile };
