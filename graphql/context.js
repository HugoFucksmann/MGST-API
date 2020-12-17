

const context = ({ req }) => {
  const tokenn = req.headers.authorization || "a";
    console.log(tokenn);
  try {
    return ({ id, email } = jwt.verify(token.split(" ")[1], SECRET_KEY));
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};

module.exports = {
  context,
};