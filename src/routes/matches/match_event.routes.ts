import { Router } from "express";
import MatchEventController from "../../controllers/matches/match_event.controller";

class TutorialRoutes {
  router = Router();
  controller = new MatchEventController();

  constructor() {
    this.initializedRoutes();
  }

  initializedRoutes() {
    // Retrieve all Tutorials
    this.router.get("/", this.controller.findAll);
    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.findOne);
    // Create a new Tutorial
    this.router.post("/", this.controller.create);
    // Update a Tutorial with id
    this.router.put("/:id", this.controller.update);
    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);
    // Delete all Tutorials
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new TutorialRoutes().router;
