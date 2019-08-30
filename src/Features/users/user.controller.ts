import passport from "passport";
import tracer from "tracer";
import { INext, IRequest, IResponse } from "../../interfaces/vendors";
import Verify from "../../server/verify";
import { Messages } from "./user.message";
import User from "./user.model";
const log = tracer.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;

class UserController {
    public static verfiyMe(req: IRequest, res: IResponse, next: INext) {
        User.findById(req._user._id, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.status(500).json({
                    data: null,
                    message: Messages.NotFound,
                    success: true,
                });
            }
            return res.status(200).json({
                data: user,
                message: Messages.SucessfullyVerify,
                success: true,
            });
        });
    }
    public static listAll(req: IRequest, res: IResponse, next: INext) {
        log(req._user);
        User.find({}, (err, users) => {
            if (err) {
                throw err;
            }
            return res.json(users);
        });
    }

    public static register(req: IRequest, res: IResponse, next: INext) {
        User.register(new User({
            username: req.body.username
        }),
            req.body.password,
            (err, user) => {
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
                user.save((error: any, registerUser: any) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
                    passport.authenticate("local")(req, res, () => {
                        delete registerUser.salt;
                        delete registerUser.hash;
                        return res.status(200).json({
                            data: registerUser,
                            message: Messages.SuceessfullyRegister,
                            success: true,
                        });
                    });
                });
            });
    }

    public static login(req: IRequest, res: IResponse, next: INext) {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, (error: any) => {
                if (error) {
                    return res.status(500).json({
                        data: null,
                        message: Messages.FaildLogin,
                        success: true,
                    });
                }
                const token = Verify.getToken(user._doc);
                return res.status(200).json({
                    data: { token },
                    message: Messages.SuceessfullyLogin,
                    success: true,
                });
            });
        })(req, res, next);
    }

    public static logout(req: IRequest, res: IResponse, next: INext) {
        req.logout();
        return res.status(200).json({
            data: null,
            message: Messages.SuceessfullyLogout,
            success: true,
        });
    }
}
export default UserController;
