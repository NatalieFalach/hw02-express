const express = require('express');
const ctrl = require("../../controller/users");
const { validateBody, authenticate } = require("../../middlewares");
const joiSchemas = require("../../schemas/users");
const router = express.Router();

router.patch("/", authenticate, validateBody(joiSchemas.subscriptionSchema), ctrl.updateSubscription);

module.exports = router;