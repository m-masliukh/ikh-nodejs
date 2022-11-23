module.exports = app => {
    const news = require("../controllers/news.controller.cjs");
  
    var router = require("express").Router();
  
    // Create new News
    router.post("/", news.create);
  
    // Retrieve all News (or search by parameter)
    router.get("/", news.findAll);
  
    // Retrieve single News with id
    router.get("/:id", news.findOne);
  
    // Update News with id
    router.put("/:id", news.update);
  
    // Delete News with id
    router.delete("/:id", news.delete);
  
    // Delete all News
    router.delete("/", news.deleteAll);
  
    app.use('/api/news', router);
  };