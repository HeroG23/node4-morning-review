module.exports = {
  checkEmail: (req, res, next) => {
    const { email } = req.body;
    if (email.includes("@") && email.includes(".")) {
      next();
    } else {
      res.status(403).send("Invalid Email Address");
    }
  },
};
