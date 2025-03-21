import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
  secret: process.env.JWT_SECRET,
  signOptions: { algorithm: 'HS256', expiresIn: '1h' },
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL),
  resetPasswordTokenTtl: parseInt(process.env.JWT_RESET_PASSWORD_TOKEN_TTL),
}));
