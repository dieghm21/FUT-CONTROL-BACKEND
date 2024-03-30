import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "referees",
})
export default class Referee extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

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
  })
  deletedAt?: Date;
}
