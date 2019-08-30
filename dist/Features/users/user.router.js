"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracer_1 = __importDefault(require("tracer"));
const verify_1 = __importDefault(require("../../server/verify"));
const user_controller_1 = __importDefault(require("./user.controller"));
const log = tracer_1.default.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const router = express_1.default.Router();
// GET users
router.get("/", verify_1.default.user, user_controller_1.default.listAll);
// Add user
router.post("/register", user_controller_1.default.register);
// Login
router.post("/login", user_controller_1.default.login);
// Logout
router.get("/logout", user_controller_1.default.logout);
// Verify Me
router.get("/me", verify_1.default.user, user_controller_1.default.verfiyMe);
exports.default = router;
//# sourceMappingURL=user.router.js.map