const express = require("express");
const AuthenticationToken = require("../../middleware/AuthenticationToken");
const LoginAdmin = require("../../middleware/Login Admin");
const {
  handlerGetUser,
  handlerPostUser,
  handlerPutUser,
  handlerDeleteUser,
  handlerLoginUser,
  handlerGetUserById,
} = require("./handler");
const router = express.Router();

const supportType = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {

    if(!supportType.includes(file.mimetype)){
      cb(new Error("File type not supported"), null);
      return;
    }

    cb(
      null,
      "avatar-" + req.user.id + "-" + Date.now() + "-" + file.originalname
    );
  },
});

const uploadAvatar = multer({storage : storage, limits:{
  fileSize: 500 * 1024
}});

// api 1
// get users
// mendapatkan seluruh users yang terdaftar
router.get("/", handlerGetUser);

router.get(":/id", AuthenticationToken, handlerGetUserById);

// api 2
// create user
// menambahkan user baru
router.post("/", AuthenticationToken, handlerPostUser);

// api 3
// update user
// mengupdate user yang sudah terdaftar
router.put("/:id", AuthenticationToken, LoginAdmin, handlerPutUser);

// api 4
// delete users
// menghapus user yang sudah terdaftar
router.delete("/:id", AuthenticationToken, handlerDeleteUser);

// api 5
// login user
// login user yang sudah terdaftar
router.post("/login", handlerLoginUser);

module.exports = router;