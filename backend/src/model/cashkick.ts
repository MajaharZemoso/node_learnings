import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  DataType,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user";
import Contract from "./contract";
import CashKickHasContracts from "./cashkickHasContracts";
import { CashkicksStatus } from "../utils/enums";

@Table({
  tableName: "cashkick",
  timestamps: true,
})
class Cashkick extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(CashkicksStatus)))
  status!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  maturity!: Date;

  @Column(DataType.FLOAT)
  total_received!: number;

  @Column(DataType.FLOAT)
  total_financed!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Contract, () => CashKickHasContracts)
  contracts!: Contract[];
}

export default Cashkick;
