/* eslint-disable prettier/prettier */

export const App_Config = () => {
  return {
    EMAIL_SEND_EMAIL_ID: process.env.APPSETTING_EMAIL_SEND_EMAIL_ID,
    EMAIL_SEND_PASSWORD: process.env.APPSETTING_EMAIL_SEND_PASSWORD,
    JWT_SECRET_USER: process.env.APPSETTING_JWT_SECRET_USER,
    JWT_SECRET_ADMIN: process.env.APPSETTING_JWT_SECRET_ADMIN,
  };
};
