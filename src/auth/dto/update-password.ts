import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
