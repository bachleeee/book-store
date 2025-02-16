const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
          if (token) {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              req.user = decoded;
              next();
          }
      } catch (error) {
          throw new Error('Not Authorized token expired, Please Login again')
      }
  } else {
      throw new Error('There is no token attach to header');
  }
};

module.exports = { authenticateToken };
