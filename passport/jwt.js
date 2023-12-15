const passportJWT = require("passport-jwt");
const Admin = require("../models/adminSchema");
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
        const admin = await Admin.findById(payload._id);
        if (!admin) return done(null, false);
        return done(null, admin);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = jwtStrategy;