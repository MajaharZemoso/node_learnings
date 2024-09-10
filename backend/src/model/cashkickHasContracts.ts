import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Contract from "./contract";
import Cashkick from "./cashkick";

@Table({
  tableName: "cashkick_has_contract",
  timestamps: true,
})
class CashkickHasContract extends Model {
  @ForeignKey(() => Contract)
  @Column(DataType.INTEGER)
  contract_id!: number;

  @ForeignKey(() => Cashkick)
  @Column(DataType.INTEGER)
  cashkick_id!: number;
}

export default CashkickHasContract;
