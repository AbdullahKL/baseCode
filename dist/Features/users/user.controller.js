"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const tracer_1 = __importDefault(require("tracer"));
const verify_1 = __importDefault(require("../../server/verify"));
const user_message_1 = require("./user.message");
const user_model_1 = __importDefault(require("./user.model"));
const log = tracer_1.default.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
class UserController {
    static verfiyMe(req, res, next) {
        user_model_1.default.findById(req._user._id, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.status(500).json({
                    data: null,
                    message: user_message_1.Messages.NotFound,
                    success: true,
                });
            }
            return res.status(200).json({
                data: user,
                message: user_message_1.Messages.SucessfullyVerify,
                success: true,
            });
        });
    }
    static listAll(req, res, next) {
        log(req._user);
        user_model_1.default.find({}, (err, users) => {
            if (err) {
                throw err;
            }
            return res.json(users);
        });
    }
    static register(req, res, next) {
        user_model_1.default.register(new user_model_1.default({
            username: req.body.username
        }), req.body.password, (err, user) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            user.save((error, registerUser) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                passport_1.default.authenticate("local")(req, res, () => {
                    delete registerUser.salt;
                    delete registerUser.hash;
                    return res.status(200).json({
                        data: registerUser,
                        message: user_message_1.Messages.SuceessfullyRegister,
                        success: true,
                    });
                });
            });
        });
    }
    static login(req, res, next) {
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, (error) => {
                if (error) {
                    return res.status(500).json({
                        data: null,
                        message: user_message_1.Messages.FaildLogin,
                        success: true,
                    });
                }
                const token = verify_1.default.getToken(user._doc);
                return res.status(200).json({
                    data: { token },
                    message: user_message_1.Messages.SuceessfullyLogin,
                    success: true,
                });
            });
        })(req, res, next);
    }
    static logout(req, res, next) {
        req.logout();
        return res.status(200).json({
            data: null,
            message: user_message_1.Messages.SuceessfullyLogout,
            success: true,
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map