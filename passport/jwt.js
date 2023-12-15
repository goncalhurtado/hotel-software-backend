const passportJWT = require("passport-jwt");
const User = require("../models/userSchema");
const dotenv = require("dotenv");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const config = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: process.env.JWT_ALGORITHM,
};

const jwtStrategy = new JWTStrategy(config, async(payload, done) => {
    try {
        const user = await User.findById(payload._id);
        if (!user) return done(null, false);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = jwtStrategy;