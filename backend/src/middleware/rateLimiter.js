
import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    // currently not limited per user but just limited 
    // if we hit 100 req per min, it will block all users
    // you can change this to limit per user by using req.ip or req.user.id
 try {
    const {success } = await ratelimit.limit("my-limit-key")
    if (!success) {
      return res.status(429).json({ message: "Too many requests, please try again later." });
    }

    next();
 }

 catch(error) {
    console.log("Rate limiter error:", error);
    next(error);
 }
};

export default rateLimiter;