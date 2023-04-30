const express = require('express');
const ctrl = require("../../controller/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const joiSchemas = require("../../schemas/users");
const router = express.Router();

router.patch("/", authenticate, validateBody(joiSchemas.subscriptionSchema), ctrl.updateSubscription);
router.patch("/avatars", authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;