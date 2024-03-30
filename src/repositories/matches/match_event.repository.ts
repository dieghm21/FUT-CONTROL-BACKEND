import { Op } from "sequelize";
import MatchEvent from "../../models/matches/match_event.model";

interface IMatchEventRepository {
    retrieveAll(searchParams: {title: string, published: boolean}): Promise<MatchEvent[]>;
    retrieveById(match_event_id: number): Promise<MatchEvent | null>;
    save(match_event: MatchEvent): Promise<MatchEvent>;
    update(match_event: MatchEvent): Promise<number>;
    delete(match_event_id: number): Promise<number>;
    deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class MatchEventRepository implements IMatchEventRepository {
  async save(match_event: MatchEvent): Promise<MatchEvent> {
    try {
      return await MatchEvent.create({
        match_id: match_event.match_id,
        team_id: match_event.team_id,
        player_id: match_event.player_id,
        type_event: match_event.type_event,
        description: match_event.description,
      });
    } catch (err) {
      throw new Error("Failed to create MatchEvent!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<MatchEvent[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

        console.log(condition);

      return await MatchEvent.findAll({ where: condition });
    } catch (error) {
        console.log(error);
      throw new Error("Failed to retrieve MatchEvents!");
    }
  }

  async retrieveById(match_event_id: number): Promise<MatchEvent | null> {
    try {
      return await MatchEvent.findByPk(match_event_id);
    } catch (error) {
      throw new Error("Failed to retrieve MatchEvents!");
    }
  }

  async update(match_event: MatchEvent): Promise<number> {
    try {
      const affectedRows = await MatchEvent.update(
        match_event,
        { where: { id: match_event.id} }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update MatchEvent!");
    }
  }

  async delete(match_event_id: number): Promise<number> {
    try {
      const affectedRows = await MatchEvent.destroy({ where: { id: match_event_id } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete MatchEvent!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return MatchEvent.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete MatchEvents!");
    }
  }
}

export default new MatchEventRepository();
