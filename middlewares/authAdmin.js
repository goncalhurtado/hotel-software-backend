const passport = require("passport");

const authenticateAdmin = (req, res, next) => {
    passport.authenticate("jwt", (error, user, info) => {

        if (error) {
            return res.status(400).send({
                message: "Error authenticating",
                status: 500,
                error,
            });
        }
        if (!user) {
            return res.status(400).send({
                message: "User not found",
                status: 404,
            });
        }
        // if (user.role !== "admin") {
        //     return res.status(400).send({
        //         message: "Unauthorized",
        //         status: 401,
        //     });
        // }
        req.user = user;
        next();

    })(req, res, next);
}

module.exports = authenticateAdmin;