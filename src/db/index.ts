import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import Tutorial from "../models/tutorial.model";
import Team from "../models/team.model";
import Player from "../models/player.model";
import Referee from "../models/referee.model";
import Match from "../models/matches/match.model";
import MatchEvent from "../models/matches/match_event.model";
const mysql2 = require('mysql2');

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      dialectModule: mysql2,
      port: 15093,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [Tutorial, Team, Player, Referee, Match, MatchEvent]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;
