import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  authSource: process.env.DATABASE_AUTH_SOURCE || process.env.DATABASE_NAME,
}));
