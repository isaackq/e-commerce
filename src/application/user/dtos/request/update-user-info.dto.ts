import { PartialType, PickType } from '@nestjs/swagger';
import { UserRequestDto } from './user.request.dto';

export class UpdateUserInfoDto extends PartialType(
  PickType(UserRequestDto, [
    'firstname',
    'lastname',
    'email',
    'mobileNumber',
    'birthday',
    'mobileNumber',
    'country',
    'city',
    'nationality',
  ] as const),
) {}
