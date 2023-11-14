require("dotenv").config();
const moongose = require("mongoose");

const dbConnection = async() => {
    try {
        await moongose.connect(process.env.DB_CONECTION, {
            dbName: "hotel-software",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log("DB Online");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnection;