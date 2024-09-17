const router = require("express").Router();
const { cleanupOrphans } = require("../utils/cleanupOrphans");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/cleanup-orphans/:userId
// Route to manually trigger orphan data cleanup  
router.route("/cleanup-orphans/:userId").get(cleanupOrphans);

/*===========================================*/

module.exports = router; 