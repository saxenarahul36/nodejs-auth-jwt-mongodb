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
