import jwt  from "jsonwebtoken";

const extractBearer = authorization => {
  if (typeof authorization !== 'string') {
    return false;
  }
  const matches = authorization.match(/(bearer)\s+(\S+)/i);

  return matches && matches[2];
};

export default {
  async isConnected(req, res, next) {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'Not Token!' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Bad Token!' });
      }
      next();
    });
  },

  async isAdmin(req, res, next) {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);
    if (!token) {
      return res.status(401).json("Unauthorized");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Bad Token!' });
      }
      if (decoded.role != 'ADMIN') {
        return res.status(401).json("Unauthorized");
      }
      next();
    });
  },
};