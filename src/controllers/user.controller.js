
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

class UserController {
  async register(req, res, next) {
    try {
      const hashed = await bcrypt.hash(req.body.password, 10);
      const user = await UserService.create({ ...req.body, password: hashed });
      res.status(201).json(user);
    } catch (err) { next(err); }
  }

  async login(req, res, next) {
    try {
      const user = await UserService.findByEmail(req.body.email);
      if (!user) throw { status: 400, message: "Invalid credentials" };

      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) throw { status: 400, message: "Invalid credentials" };

      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      await UserService.saveRefreshToken(user._id, refreshToken);

      res.json({ accessToken, refreshToken });
    } catch (err) { next(err); }
  }
}

export default new UserController();
