import { Model, Table, Column, DataType } from "sequelize-typescript";
import Team from "../team.model";
import Referee from "../referee.model";

@Table({
  tableName: "matches",
})
export default class Match extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "visiting_team_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Team,
        key: "id"
    }
  })
  visiting_team_id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "local_team_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Team,
        key: "id"
    }
  })
  local_team_id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "principal_referee_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
        model: Referee,
        key: "id"
    }
  })
  principal_referee_id?: number;

  @Column({
    type: DataType.DATE,
    field: "date_time"
  })
  date_time?: string;
  
  @Column({
    type: DataType.STRING(255),
    field: "stadium"
  })
  stadium?: string;

  @Column({
    type: DataType.INTEGER,
    field: "local_result"
  })
  local_result?: number;

  @Column({
    type: DataType.INTEGER,
    field: "visiting_result"
  })
  visiting_result?: number;

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
