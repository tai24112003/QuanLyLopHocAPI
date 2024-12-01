// Middleware kiểm tra quyền
const checkPermission = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res
          .status(401)
          .json({ message: "Bạn cần đăng nhập để tiếp tục." });
      }

      const hasPermission = allowedRoles.includes(user.role);

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền truy cập tài nguyên này." });
      }

      next(); // Cho phép tiếp tục nếu đủ quyền
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi.", error });
    }
  };
};

module.exports = checkPermission;
