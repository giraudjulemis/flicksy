const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const { userService, authService } = require("../services");

const userController = {
  async getProfile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);
      res.cookie("x-access-token", token).send({
        user: res.locals.permission.filter(user._doc),
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
