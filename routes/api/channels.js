const express = require('express');
const router = express.Router();
const channelsCtrl = require('../../controllers/api/channels');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// POST /api/channels
router.post('/', channelsCtrl.create);

router.get("/", channelsCtrl.getAll);

module.exports = router;