export interface IloginBody {
  email: string;
  password: string;
}

// send otp
export interface IsendEmail {
  email: string;
  type: string;
}

// forget password props interface
export interface IForgetPassBody {
  password: string;
  table: string;
  passField: string;
  userEmailField: string;
  userEmail: string;
}
