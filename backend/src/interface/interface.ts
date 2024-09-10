export interface IUser {
  name: string;
  email: string;
  password: string;
  credit_balance: number;
}

export interface ICashkick {
  name: string;
  status: string;
  maturity: Date;
  total_received: number;
  total_financed: number;
  user_id: number;
}

export interface IContract {
  name: string;
  type: string;
  status: string;
  per_payment: number;
  term_length: number;
  payment_amount: number;
}

export interface IPayment {
  due_date: Date;
  status: string;
  expected_amount: number;
  outstanding: number;
  user_id: number;
}
