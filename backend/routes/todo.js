const router = require('express').Router();
const controller = require("../controllers/todo.controller");

const verifyToken = require('./../middlewares/verifyToken');

router.get('/', [verifyToken], controller.getAll)
router.post('/', [verifyToken], controller.create)
router.put('/', [verifyToken], controller.update)
router.delete('/', [verifyToken], controller.delete)

module.exports = router; 