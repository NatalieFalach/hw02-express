const express = require('express');

const ctrl = require("../../controller/auth");

const { validateBody, authenticate } = require("../../middlewares");

const joiSchemas = require("../../schemas/users");

const router = express.Router();

router.post("/register", validateBody(joiSchemas.registerSchema), ctrl.register);

router.post("/login", validateBody(joiSchemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;