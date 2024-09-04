const router = require("express").Router();
const { cleanupOrphanReviews } = require("../utils/cleanupOrphanedReviews");

/*===========================================*/
/*===========================================*/
/*===========================================*/

//  /api/cleanup-reviews 
// Temporary route to manually trigger orphan reviews cleanup   
router.route("/cleanup-reviews").get(cleanupOrphanReviews);

/*===========================================*/

module.exports = router;