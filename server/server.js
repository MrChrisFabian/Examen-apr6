const express = require("express");
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser'); // to be able to read cookies

require('dotenv').config();

app.use(cookieParser());

const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET, POST, PUT, PATCH, DELETE', // Allow these methods
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");

const movieRoute = require("./routes/movie.routes");
app.use("/api/movie", movieRoute);

const UserRouter = require("./routes/user.routes");
app.use("/api/auth", UserRouter);

const PORT = process.env.PUERTO || 8000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));