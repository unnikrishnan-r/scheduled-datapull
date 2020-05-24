const router = require("express").Router();
const dataPullUSAController = require("../../controllers/dataPullUSAController");

// Matches with "/api/projects"
router.route("/getCurrentSummary").get(dataPullUSAController.getCurrentSummary);
router.route("/getDailySummary").get(dataPullUSAController.getDailySummary);

module.exports = router;
