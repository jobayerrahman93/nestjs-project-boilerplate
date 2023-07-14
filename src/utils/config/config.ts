// Env types
interface ENV {
  EMAIL_SEND_EMAIL_ID: string | undefined;
  EMAIL_SEND_PASSWORD: string | undefined;
  JWT_SECRET_USER: string | undefined;
  JWT_SECRET_ADMIN: string | undefined;
}

// Config types
interface Config {
  EMAIL_SEND_EMAIL_ID: string;
  EMAIL_SEND_PASSWORD: string;
  JWT_SECRET_USER: string;
  JWT_SECRET_ADMIN: string;
}

// Loading process.env as  ENV interface

const getConfig = (): ENV => {
  return {
    EMAIL_SEND_EMAIL_ID: process.env.APPSETTING_EMAIL_SEND_EMAIL_ID,
    EMAIL_SEND_PASSWORD: process.env.APPSETTING_EMAIL_SEND_PASSWORD,
    JWT_SECRET_USER: process.env.APPSETTING_JWT_SECRET_USER,
    JWT_SECRET_ADMIN: process.env.APPSETTING_JWT_SECRET_ADMIN,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getSanitzedConfig(getConfig());
export default config;
