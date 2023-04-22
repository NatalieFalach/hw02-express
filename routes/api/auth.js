const express = require('express');

const ctrl = require("../../controller/auth");

const { validateBody } = require("../../middlewares");

const joiSchemas = require("../../schemas/users");

const router = express.Router();

router.post("/register", validateBody(joiSchemas.registerSchema), ctrl.register);

router.post("/login", validateBody(joiSchemas.loginSchema), ctrl.login);

module.exports = router;