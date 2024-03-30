import { Model, Table, Column, DataType } from "sequelize-typescript";
import Team from "../team.model";
import Referee from "../referee.model";
import Match from "./match.model";
import Player from "../player.model";

@Table({
  tableName: "matches_events",
})
export default class MatchEvent extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "match_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Match,
        key: "id"
    }
  })
  match_id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "team_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Team,
        key: "id"
    }
  })
  team_id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "player_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Player,
        key: "id"
    }
  })
  player_id?: number;

  @Column({
    type: DataType.ENUM("GOAL", "YELLOW_CARD", "RED_CARD"),
    field: "type_event",
  })
  type_event?: string;
  
  @Column({
    type: DataType.STRING(255),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.TINYINT,
    field: "state"
  })
  state?: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deletedAt'
  }) // Define la columna deletedAt para el modo paranoid
  deletedAt?: Date;
}
