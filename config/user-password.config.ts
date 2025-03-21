import { registerAs } from '@nestjs/config';

export default registerAs('userPassword', () => ({
  minLength: parseInt(process.env.PASSWORD_MIN_LENGTH),
  minLowercase: parseInt(process.env.PASSWORD_MIN_LOWERCASE),
  minUppercase: parseInt(process.env.PASSWORD_MIN_UPPERCASE),
  minNumbers: parseInt(process.env.PASSWORD_MIN_NUMBERS),
  minSymbols: parseInt(process.env.PASSWORD_MIN_SYMBOLS),
}));
