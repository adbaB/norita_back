declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    POSTGRES_PORT: string;
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    SALT_HASH: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
    MAX_FILE_SIZE: string;
    REWARD_POINTS_TUTORIAL: string;
  }
}
