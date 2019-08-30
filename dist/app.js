"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-Parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require("cors");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const path = __importStar(require("path"));
const tracer_1 = __importDefault(require("tracer"));
const router_1 = __importDefault(require("./router/router"));
require("./server/auth");
const database_1 = __importDefault(require("./server/database"));
const log = tracer_1.default.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const app = express_1.default();
// connecting Database
database_1.default();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(morgan_1.default("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path.join(__dirname, "public")));
// Setup Passport.js for token based user auth
app.use(passport_1.default.initialize());
// Requiring routes
app.use("/", router_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
            error: err,
            message: err.message
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        error: {},
        message: err.message
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map