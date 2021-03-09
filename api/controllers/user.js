const UserService = require("../services/user");
const response = require('../response');

class  userController{
  async signup(req, res) {
      const result = await UserService.signup(req.body);
      res.status(200).send(response("user created", result));
  }
async login(req, res) {
      const result = await UserService.login(req.body);
      res.status(200).send(response("User", result));
  }
async mailer(req, res) {
   const result = await UserService.mailer(req.body);
   res.status(200).send(response("message", result));
}

  async delete(req, res) {
      const result = await UserService.delete(req.params.userId);
      res.status(200).send(response("User removed", result));
  }

}

module.exports = new userController();
