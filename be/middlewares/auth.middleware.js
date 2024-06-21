import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
  const data = { userId: user._id };
  return jwt.sign(data, process.env.JWT_SECRET, { 'expiresIn': '6h' });
}

export const verifyAccessToken = (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return res.status(401).send({ message: 'Access token missing' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = userId;

    next();

  } catch (error) {
    console.log(error.message);
    res.status(403).send({ error: error.message });
  }
}
