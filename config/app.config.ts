import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environement: process.env.NODE_ENV || 'prod',
}));
