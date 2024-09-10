import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user";
import { PaymentStatus } from "../utils/enums";

@Table({
  tableName: "payment",
  timestamps: true,
})
class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  due_date!: Date;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(PaymentStatus)))
  status!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  expected_amount!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  outstanding!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Payment;
