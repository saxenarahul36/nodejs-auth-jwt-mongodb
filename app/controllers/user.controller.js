const db = require("../models/");
const catchAsync = require("../utils/function");
const User = db.user;

exports.getAllUser = catchAsync(async (req, res, next) => {
  const query = {}; // TODO find specific user
  await User.find(query, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "500",
        error: err,
      });
    }
    return res.status(200).json({ data: user, message: "success" });
  });
});

exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Public Content.", status: 200 });
};

exports.userBoard = (req, res) => {
  res.status(200).send({ message: "User Content.", status: 200 });
};

exports.adminBoard = (req, res) => {
  res.status(200).send({ message: "Admin Content.", status: 200 });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send({ message: "Moderator Content.", status: 200 });
};
