import * as bodyParser from "body-Parser";
import cookieParser from "cookie-parser";
import cors = require("cors");
import express from "express";
import logger from "morgan";
import passport from "passport";
import * as path from "path";
import favicon from "serve-favicon";
import tracer from "tracer";
import routes from "./router/router";
import "./server/auth";
import databaseConnection from "./server/database";
const log = tracer.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const app = express();
// connecting Database
databaseConnection();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Setup Passport.js for token based user auth
app.use(passport.initialize());

// Requiring routes
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(err.status || 500);
        res.render("error", {
            error: err,
            message: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.render("error", {
        error: {},
        message: err.message
    });
});

export default app;
