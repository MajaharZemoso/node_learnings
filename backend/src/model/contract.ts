import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import Cashkick from "./cashkick";
import CashKickHasContracts from "./cashkickHasContracts";
import { contractStatus, contractType } from "../utils/enums";

@Table({
  tableName: "contract",
  timestamps: true,
})
class Contract extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(contractType)))
  type!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(contractStatus)))
  status!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  per_payment!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  term_length!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  payment_amount!: number;

  @BelongsToMany(() => Cashkick, () => CashKickHasContracts)
  cashkicks!: Cashkick[];
}

export default Contract;
