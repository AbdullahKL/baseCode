"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passportLocal = require("passport-local");
require("../config/config");
const user_model_1 = __importDefault(require("../Features/users/user.model"));
// var User = require('');
const LocalStrategy = passportLocal.Strategy;
// Setup Local Login Strategy
passport_1.default.use(new LocalStrategy(user_model_1.default.authenticate()));
passport_1.default.serializeUser(user_model_1.default.serializeUser());
passport_1.default.deserializeUser(user_model_1.default.deserializeUser());
//# sourceMappingURL=auth.js.map