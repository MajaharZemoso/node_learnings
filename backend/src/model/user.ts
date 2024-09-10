import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Cashkick from "./cashkick";
import Payment from "./payment";

@Table({
  tableName: "user",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.FLOAT)
  credit_balance!: number;

  @HasMany(() => Cashkick)
  cashkicks!: Cashkick[];

  @HasMany(() => Payment)
  payments!: Payment[];
}

export default User;
