require("dotenv/config");
// require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const workoutRouter = require("./routes/workout.routes");
app.use("/api", isAuthenticated, workoutRouter);

const taskRouter = require("./routes/task.routes");
app.use("/api", isAuthenticated, taskRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userProfile = require("./routes/userprofile.routes");
app.use("/userprofile", isAuthenticated, userProfile);

require("./error-handling")(app);

module.exports = app;
