import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ClientRequestDto {
  @ApiProperty({
    example: 'Seba',
    description: 'The firstname of the client',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'AlJamal',
    description: 'The lastname of the client',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'Iindividual',
    description: 'The status for the client, could be: individual or institution',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  classification: string;

  @ApiProperty({
    example: 'Palestine',
    description: 'The country where the client is from',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: '400458235',
    description: 'The national identity number for the client',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  identityNumber: string;

  constructor(firstName: string, lastName: string, classification: string, country: string, identityNumber: string) {
    firstName = this.firstName;
    lastName = this.lastName;
    classification = this.classification;
    country = this.classification;
    identityNumber = this.identityNumber;
  }
}
