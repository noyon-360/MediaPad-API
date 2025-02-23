const router = require("express").Router();
const ensureAuthenticated = require('../Middlewares/Authentication');

const { command } = require("../Controller/CommandController.js");

router.post("/command", ensureAuthenticated, command);

module.exports = router;
