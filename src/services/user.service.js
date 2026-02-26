
import User from "../models/user.model.js";

class UserService {
  async create(data) { return await User.create(data); }

  async findAll(query, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await User.find(query).skip(skip).limit(limit);
  }

  async findByEmail(email) { return await User.findOne({ email }); }

  async saveRefreshToken(id, token) {
    return await User.findByIdAndUpdate(id, { refreshToken: token });
  }
}

export default new UserService();
