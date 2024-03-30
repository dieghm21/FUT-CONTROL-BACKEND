import { Request, Response } from "express";
import MatchEvent from "../../models/matches/match_event.model";
import matchEventRepository from "../../repositories/matches/match_event.repository";
import matchRepository from "../../repositories/matches/match.repository";
import { toPlain } from "../../utils";
import Match from "../../models/matches/match.model";

export default class TutorialController {
  async create(req: Request, res: Response) {
    try {
        const match_event: MatchEvent  = req.body;
        const saved_match_event = await matchEventRepository.save(match_event);
        if(match_event.type_event === "GOAL") {
          const match = await matchRepository.retrieveById(Number(match_event?.match_id))
          if(match) {
            const response_match = toPlain(match) as Match
            if (response_match?.local_team_id === match_event.team_id) {
              console.log("el equipo del evento es local");
              response_match.local_result = Number(response_match?.local_result) + 1
              console.log(response_match);
              await matchRepository.update(response_match)
            } else if (response_match?.visiting_team_id === match_event.team_id){
              console.log("el equipo del evento es visitante");
              response_match.visiting_result = Number(response_match?.visiting_result) + 1
              console.log(response_match);
              await matchRepository.update(response_match)

            }

          }
        }
      res.status(201).send(saved_match_event);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving matches events."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";
    try {
      const matches_events = await matchEventRepository.retrieveAll({ title });

      res.status(200).send(matches_events);
    } catch (err) {
        console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving matches events."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const match_event = await matchEventRepository.retrieveById(id);

      if (match_event) res.status(200).send(match_event);
      else
        res.status(404).send({
          message: `Cannot find match event with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving match event with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let match_event: MatchEvent = req.body;
    match_event.id = parseInt(req.params.id);

    try {
      const num = await matchEventRepository.update(match_event);

      if (num == 1) {
        res.send({
          message: " match event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update  match event with id=${match_event.id}. Maybe  match event was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating  match event with id=${match_event.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await matchEventRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "match event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete match event with id=${id}. Maybe match event was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete match event with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await matchEventRepository.deleteAll();

      res.send({ message: `${num} matches events were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all matches events."
      });
    }
  }
}
