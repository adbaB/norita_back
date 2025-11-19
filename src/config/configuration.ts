import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db: {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
    },
    coins: {
      tutorial: parseInt(process.env.REWARD_POINTS_TUTORIAL, 10) || 50,
    },
    mail: {
      port: parseInt(process.env.PORT, 10),
    },
    jwt: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    },
    jwtRefresh: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
    google: {
      client: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    file: {
      maxSize: parseInt(process.env.FILE_MAX_SIZE, 10) || 100 * 1024 * 1024,
    },
    env: process.env.NODE_ENV || 'development',
  };
});
