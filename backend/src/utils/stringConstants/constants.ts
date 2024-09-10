export const DATABASE_SYNC = "Database synchronized successfully";
export const DATABASE_SYNC_ERROR = "Error synchronizing database:";
export const SERVICE_PORT = "Server is running on port";
export const CASHKICK_MESSAGES = {
  SUCCESS_FETCH: "Successfully fetched cashkicks",
  SUCCESS_ADD: "Successfully added cashkick",
  SUCCESS_UPDATE: "Successfully updated cashkick",
  SUCCESS_DELETE: "Successfully deleted cashkick",
  ERROR_FETCH: "Error fetching cashkicks",
  ERROR_ADD: "Error adding cashkick",
  ERROR_UPDATE: "Error updating cashkick",
  ERROR_DELETE: "Error deleting cashkick",
  NOT_FOUND: "Cashkick not found",
  INVALID_ID: "Invalid Cashkick ID",
};

export const CONTRACT_MESSAGES = {
  SUCCESS_FETCH: "Successfully fetched contracts",
  SUCCESS_ADD: "Successfully added contract",
  SUCCESS_UPDATE: "Successfully updated contract",
  SUCCESS_DELETE: "Successfully deleted contract",
  ERROR_FETCH: "Error fetching contracts",
  ERROR_ADD: "Error adding contract",
  ERROR_UPDATE: "Error updating contract",
  ERROR_DELETE: "Error deleting contract",
  NOT_FOUND: "Contract not found",
  INVALID_ID: "Invalid Contract ID",
};

export const PAYMENT_MESSAGES = {
  SUCCESS_FETCH: "Successfully fetched payments",
  SUCCESS_ADD: "Successfully added payment",
  SUCCESS_UPDATE: "Successfully updated payment",
  SUCCESS_DELETE: "Successfully deleted payment",
  ERROR_FETCH: "Error fetching payments",
  ERROR_ADD: "Error adding payment",
  ERROR_UPDATE: "Error updating payment",
  ERROR_DELETE: "Error deleting payment",
  NOT_FOUND: "Payment not found",
  INVALID_ID: "Invalid Payment ID",
};

export const USER_MESSAGES = {
  SUCCESS_FETCH: "Successfully fetched users",
  SUCCESS_ADD: "Successfully added user",
  SUCCESS_UPDATE: "Successfully updated user",
  SUCCESS_DELETE: "Successfully deleted user",
  ERROR_FETCH: "Error fetching users",
  ERROR_ADD: "Error adding user",
  ERROR_UPDATE: "Error updating user",
  ERROR_DELETE: "Error deleting user",
  NOT_FOUND: "User not found",
  INVALID_ID: "Invalid User ID",
  INVALID_EMAIL: "Invalid User Email",
  EMAIL_EXIST: "User with this email already exists",
  INVALID_OLD_PASSWORD:
    "The chosen password is not available. Please choose a different password.",
};

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  USER_EXIST: 409,
};

export const CONTRACT_ID_REQUIRED = "Contract IDs are required";

export const CASHKICK_ATTRIBUTES = [
  "name",
  "status",
  "maturity",
  "total_received",
  "total_financed",
];

export const PAYMENT_ATTRIBUTES = [
  "due_date",
  "status",
  "expected_amount",
  "outstanding",
];

export const UNAUTHORIZED_USER = "Unauthorized User";
export const INVALID_TOKEN = "Invalid Token";
export const JWT_SECRET_KEY = "secret846";
