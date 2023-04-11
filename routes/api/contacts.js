const express = require("express");
const ctrl = require("../../controller/contacts");
const { validateBody } = require("../../middlewares");
const joiSchemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(joiSchemas.createSchema), ctrl.add);

router.put("/:id", validateBody(joiSchemas.updateSchema), ctrl.updateById);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
