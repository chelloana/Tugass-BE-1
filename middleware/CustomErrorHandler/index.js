function CustomErrorHandler(error, req, res, next) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
  
  module.exports = CustomErrorHandler;