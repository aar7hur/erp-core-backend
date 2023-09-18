import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}
