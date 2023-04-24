const express = require("express");
const ctrl = require("../../controller/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const joiSchemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(joiSchemas.createSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, validateBody(joiSchemas.updateSchema), ctrl.updateById)

router.patch("/:id/favorite", authenticate, isValidId, validateBody(joiSchemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
