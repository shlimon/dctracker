const express = require("express"); 
const router = express.Router();
const memberController = require("../controller/memberController"); 

router.route('/')
    .get(memberController.getAllMembers)
    .post(memberController.createNewMember)
    .put(memberController.updateMember)
    .delete(memberController.deleteMember)


router.route('/:id')
    .get(memberController.getMember)


module.exports = router;  