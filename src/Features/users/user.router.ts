import express from "express";
import tracer from "tracer";
import verify from "../../server/verify";
import userCtrl from "./user.controller";

const log = tracer.console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const router = express.Router();
// GET users
router.get("/", verify.user, userCtrl.listAll);

// Add user
router.post("/register", userCtrl.register);

// Login
router.post("/login", userCtrl.login);

// Logout
router.get("/logout", userCtrl.logout);

// Verify Me
router.get("/me", verify.user, userCtrl.verfiyMe);

export default router;
