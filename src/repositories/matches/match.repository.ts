import { Op } from "sequelize";
import Match from "../../models/matches/match.model";

interface IMatchRepository {
    retrieveAll(searchParams: {title: string, published: boolean}): Promise<Match[]>;
    retrieveById(match_id: number): Promise<Match | null>;
    save(match: Match): Promise<Match>;
    update(match: Match): Promise<number>;
    delete(match_id: number): Promise<number>;
    deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class MatchRepository implements IMatchRepository {
  async save(match: Match): Promise<Match> {
    try {
      return await Match.create({...match});
    } catch (err) {
      throw new Error("Failed to create Match!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Match[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

        console.log(condition);

      return await Match.findAll({ where: condition });
    } catch (error) {
        console.log(error);
      throw new Error("Failed to retrieve Matchs!");
    }
  }

  async retrieveById(match_id: number): Promise<Match | null> {
    try {
      return await Match.findByPk(match_id);
    } catch (error) {
        console.log(error);
      throw new Error("Failed to retrieve Matchs!");
    }
  }

  async update(match: Match): Promise<number> {
    try {
      const affectedRows = await Match.update(
        match,
        { where: { id: match.id} }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Match!");
    }
  }

  async delete(match_id: number): Promise<number> {
    try {
      const affectedRows = await Match.destroy({ where: { id: match_id } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Match!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Match.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Matchs!");
    }
  }
}

export default new MatchRepository();
