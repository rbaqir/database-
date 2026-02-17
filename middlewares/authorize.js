export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.Role?.name;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    next();
  };
};
