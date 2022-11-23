module.exports = app => {
    const proposals = require("../controllers/proposal.controller.cjs");
  
    var router = require("express").Router();
  
    // Create a new Proposal
    router.post("/", proposals.create);
  
    // Retrieve all Proposals
    router.get("/", proposals.findAll);
  
    // Retrieve a single Proposal with id
    router.get("/:id", proposals.findOne);
  
    // Update a Proposal with id
    router.put("/:id", proposals.update);
  
    // Delete a Proposal with id
    router.delete("/:id", proposals.delete);
  
    // Delete all Proposals
    router.delete("/", proposals.deleteAll);
  
    app.use('/api/proposals', router);
  };