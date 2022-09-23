const { User } = require("../../models");
const bcrypt = require("bcrypt");
const {
  validateUserCreatePayload,
  validateUserUpdatePayload,
  validateUserUpdatePhotoPayload,
} = require("../../validator/user");
const { generateAccessToken } = require("../../utils/TokenManager");

module.exports = {
  handlerGetUser: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json({
        status: "success",
        message: "Get all users",
        data: users,
      });

      if(!user){
        throw new Error ("User Not Found");
      }

      res.status(200).json({
        status: "success",
        message : "Get user by id",
        data: user,
      });

    } catch (error) {
      next(error);
    }
  },

  handlerGetUserById: async(req, res, next) => {
    try{
      const {id} = req.params;
      const user = await User.findOne({
        where: {
          id: id,
        },
      })
    }catch(error){
      next (error);
    }
  },

  handlerPostUser: async (req, res, next) => {
    try {
      const { email, password, fullname, shortname, biodata, angkatan, jabatan } = req.body;

      validateUserCreatePayload(req.body);
      validateUserUpdatePhotoPayload(req, file);
      //console.log(req.file);
      const hashPassword = await bcrypt.hash(password, 10);
      const filename = req.file.filename;
      console.log(filename);
      const user = await User.create({
        email,
        password: hashPassword,
        fullname,
        shortname,
        biodata,
        angkatan,
        jabatan,
        photo:"/images/" + req.file.filename,
      });
      res.status(200).json({
        status: "success",
        message: "User created",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullname, shortname, biodata, angkatan, jabatan } = req.body;
      validateUserUpdatePayload({ id, fullname, shortname, biodata, angkatan, jabatan });

      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update({
        fullname,
        shortname,
        biodata,
        angkatan,
        jabatan,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      res.status(200).json({
        message: "User deleted",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        fullname: user.fullname,
        shortname: user.shortname,
        email: user.email,
      });

      res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};