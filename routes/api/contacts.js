const express = require("express");
const ctrl = require("../../controller/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const joiSchemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(joiSchemas.createSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(joiSchemas.updateSchema), ctrl.updateById)

router.patch("/:id/favorite", isValidId, validateBody(joiSchemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
