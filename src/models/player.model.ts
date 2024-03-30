import { Model, Table, Column, DataType } from "sequelize-typescript";
import Team from "./team.model";

@Table({
  tableName: "players",
})
export default class Player extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

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
    type: DataType.STRING(50),
    field: "position"
  })
  position?: string;

  @Column({
    type: DataType.STRING(255),
    field: "name"
  })
  name?: string;

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
