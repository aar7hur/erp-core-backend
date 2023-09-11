import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  // Maximum password length should not be set too low, as it will prevent
  // users from creating passphrases. A common maximum length is 64 characters due to
  // limitations in certain hashing algorithms, as discussed in the Password Storage Cheat Sheet.
  // It is important to set a maximum password length to prevent long password Denial of Service attacks.
  @MaxLength(64)
  @MinLength(16)
  @IsStrongPassword()
  password: string;
}
